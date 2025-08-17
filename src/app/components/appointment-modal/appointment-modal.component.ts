import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment, ModalMessage } from '../../models/appointment.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appointment-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment-modal.component.html',
  styleUrl: './appointment-modal.component.css'
})
export class AppointmentModalComponent implements OnInit, OnDestroy {
  isModalOpen = false;
  appointmentForm: FormGroup;
  modalMessage: ModalMessage | null = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService
  ) {
    this.appointmentForm = this.fb.group({
      patientName: ['', Validators.required],
      patientPhone: ['', Validators.required],
      patientEmail: [''],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      clinicLocation: ['', Validators.required],
      reasonForVisit: ['']
    });
  }

  ngOnInit() {
    this.subscriptions.push(
      this.appointmentService.isModalOpen$.subscribe(open => {
        this.isModalOpen = open;
        if (open) {
          this.appointmentForm.reset();
          this.modalMessage = null;
        }
      }),
      this.appointmentService.modalMessage$.subscribe(message => {
        this.modalMessage = message;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  closeModal() {
    this.appointmentService.closeModal();
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const appointment: Appointment = this.appointmentForm.value;
      this.appointmentService.submitAppointment(appointment).subscribe(
        (message: ModalMessage) => {
          this.modalMessage = message;
          setTimeout(() => {
            this.appointmentService.clearMessage();
          }, 3000);
        }
      );
    } else {
      this.appointmentService.showErrorMessage('Please fill in all required fields.');
    }
  }
}
