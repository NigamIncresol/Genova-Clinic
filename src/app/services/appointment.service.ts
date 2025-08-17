import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment, ModalMessage } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private isModalOpenSubject = new BehaviorSubject<boolean>(false);
  private modalMessageSubject = new BehaviorSubject<ModalMessage | null>(null);

  isModalOpen$ = this.isModalOpenSubject.asObservable();
  modalMessage$ = this.modalMessageSubject.asObservable();

  constructor(private fb: FormBuilder) { }

  createAppointmentForm(): FormGroup {
    return this.fb.group({
      patientName: ['', Validators.required],
      patientPhone: ['', Validators.required],
      patientEmail: [''],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      clinicLocation: ['', Validators.required],
      reasonForVisit: ['']
    });
  }

  openModal(): void {
    this.isModalOpenSubject.next(true);
    this.modalMessageSubject.next(null);
  }

  closeModal(): void {
    this.isModalOpenSubject.next(false);
    this.modalMessageSubject.next(null);
  }

  submitAppointment(appointment: Appointment): Observable<ModalMessage> {
    // Simulate API call
    return new Observable(observer => {
      setTimeout(() => {
        const successMessage: ModalMessage = {
          type: 'success',
          message: 'Appointment request sent successfully! We will contact you shortly to confirm.'
        };
        observer.next(successMessage);
        observer.complete();
      }, 1000);
    });
  }

  showSuccessMessage(message: string): void {
    this.modalMessageSubject.next({
      type: 'success',
      message
    });
  }

  showErrorMessage(message: string): void {
    this.modalMessageSubject.next({
      type: 'error',
      message
    });
  }

  clearMessage(): void {
    this.modalMessageSubject.next(null);
  }
}
