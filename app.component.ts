// ============================================================
// FILE: src/app/app.component.ts
// ============================================================
import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Kasthuri K — Portfolio';
  profile: any = null;
  navScrolled = false;
  contactForm = { name: '', email: '', message: '' };
  formStatus = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch profile data from Django REST API
    this.http.get('http://localhost:8000/api/profile/').subscribe({
      next: (data) => this.profile = data,
      error: () => this.loadDefaultProfile()
    });
  }

  loadDefaultProfile(): void {
    this.profile = {
      name: 'Kasthuri K',
      role: 'Full Stack Developer',
      email: 'kasthuri@email.com',
      linkedin: 'https://linkedin.com/in/kasthuri-k',
      github: 'https://github.com/kasthuri-k',
      about: 'Passionate full stack developer with expertise in Django, Angular, and MySQL.',
      skills: [
        { category: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'Angular', 'Bootstrap'] },
        { category: 'Backend', items: ['Python', 'Django', 'REST APIs'] },
        { category: 'Database', items: ['MySQL', 'PostgreSQL'] },
        { category: 'Tools', items: ['Git', 'GitHub', 'Linux', 'Docker'] }
      ],
      experience: [
        {
          title: 'Junior Software Developer',
          company: 'Company Name',
          period: '2023 – Present',
          points: ['Built Django REST APIs', 'Developed Angular frontends', 'Managed MySQL databases']
        }
      ],
      education: [
        {
          degree: 'B.E. Computer Science',
          school: 'University Name',
          year: '2019–2023',
          grade: 'CGPA: 8.5'
        }
      ]
    };
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.navScrolled = window.scrollY > 50;
  }

  submitContact(): void {
    this.http.post('http://localhost:8000/api/contact/', this.contactForm).subscribe({
      next: () => {
        this.formStatus = 'success';
        this.contactForm = { name: '', email: '', message: '' };
        setTimeout(() => this.formStatus = '', 3000);
      },
      error: () => {
        this.formStatus = 'error';
        setTimeout(() => this.formStatus = '', 3000);
      }
    });
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
