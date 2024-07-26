import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Firestore } from '@google-cloud/firestore';
import { envVars } from 'src/config';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {

  
  private readonly db = new Firestore({
    projectId: envVars.FIREBASE_PROYECT_ID,
    credentials: {
      client_email: envVars.FIREBASE_CLIENT_EMAIL,
      private_key: envVars.FIREBASE_PRIVATE_KEY,
    },
  })
  private readonly TaskColection = this.db.collection('tasks')


  async create(createTaskDto: CreateTaskDto , uid: string) {
    const dockRef = await this.TaskColection.add({
      title: createTaskDto.title,
      description: createTaskDto.description,
      owner: uid,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const newTask = { id: dockRef.id, ...createTaskDto }
    return newTask
  }

  async findAll( uid: string) {
    const tasks = await this.TaskColection.where('owner', '==', uid).get()
    if(!tasks.docs.length) throw new HttpException('No tasks found', HttpStatus.NO_CONTENT)

    return tasks.docs.map(doc => {
     const {title} =  doc.data() as Task
     return { id: doc.id, title }
    })
    
  }

  async findOne(id: string , uid: string) {
    const task = await this.TaskColection.doc(id).get()
    const data = task.data() as Task
    if(!task.exists || data.owner != uid ) throw new NotFoundException(`Task with id ${id} not found`) 
    return { id: task.id, title: task.data().title, description: task.data().description  , status: task.data().status, createdAt: task.data().createdAt, updatedAt: task.data().updatedAt }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, uid: string) {
     const task = await this.findOne(id, uid) as Task
     
     await this.TaskColection.doc(id).update({
       title: updateTaskDto.title || task.title,
       description: updateTaskDto.description || task.description,
       status: updateTaskDto.status || task.status,
       updatedAt: new Date()
     })
     return { id: task.id, ...updateTaskDto }
  }

  async remove(id: string, uid: string) {
    const task = await this.findOne(id, uid) 
    task
    await this.TaskColection.doc(id).delete()
    return { id } 
  }
}
