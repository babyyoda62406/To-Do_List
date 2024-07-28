export const firebaseTimeStampToDate = (firestoreTimestamp: { _seconds: number, _nanoseconds: number }) => {
    const milliseconds = firestoreTimestamp._seconds * 1000 + Math.floor(firestoreTimestamp._nanoseconds / 1000000);
    const date = new Date(milliseconds);
    
    // Opciones de formato (puedes ajustarlas según tus necesidades)
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false, // Usa formato de 24 horas
    };
    
    // Formatear la fecha a cadena de texto
    const formattedDate = date.toLocaleString('es-ES', options);
    
    return formattedDate;
};
