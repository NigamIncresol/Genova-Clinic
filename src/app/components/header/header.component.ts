import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isMobileMenuOpen = false;
  activeSection = 'home';

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.setupScrollTracking();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.updateActiveSection();
  }

  setupScrollTracking() {
    document.addEventListener('DOMContentLoaded', () => {
      const navLinks = document.querySelectorAll('nav a');
      navLinks.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const href = anchor.getAttribute('href');
          if (href) {
            const targetElement = document.querySelector(href);
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: 'smooth'
              });
            }
          }
          // Close mobile menu after navigation
          this.isMobileMenuOpen = false;
        });
      });
    });
  }

  updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(section => {
      const sectionElement = section as HTMLElement;
      const sectionTop = sectionElement.offsetTop - 100;
      const sectionHeight = sectionElement.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id') || '';
      }
    });

    this.activeSection = current;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  openAppointmentModal() {
    this.appointmentService.openModal();
  }
}
