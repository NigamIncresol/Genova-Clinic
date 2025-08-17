export interface Appointment {
    patientName: string;
    patientPhone: string;
    patientEmail?: string;
    appointmentDate: string;
    appointmentTime: string;
    clinicLocation: string;
    reasonForVisit?: string;
}

export interface ModalMessage {
    type: 'success' | 'error';
    message: string;
}

