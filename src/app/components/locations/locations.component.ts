import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css'
})
export class LocationsComponent {
  constructor(private appointmentService: AppointmentService) { }

  openAppointmentModal() {
    this.appointmentService.openModal();
  }
}
