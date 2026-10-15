import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ZardDropdownImports } from '@/shared/components/dropdown';
import { ZardComboboxImports } from '@/shared/components/combobox';

interface Student {
    id: string;
    name: string;
    email: string;
    course: string;
    progress: number;
    mastery: number;
    risk: 'Low' | 'Medium' | 'High';
}

@Component({
    selector: 'app-directory',
    imports: [CommonModule, RouterModule, FormsModule, ZardDropdownImports, ZardComboboxImports],
    templateUrl: './directory.html'
})
export default class Directory {
    activeNav = signal<string>('all');
    
    navItems = [
        { id: 'all', label: 'All Students' },
        { id: 'at-risk', label: 'At Risk' },
        { id: 'recently-active', label: 'Recently Active' }
    ];

    // Filter Options
    courseOptions = [
        { value: 'all', label: 'All Courses' },
        { value: 'biology', label: 'Biology' },
        { value: 'physics', label: 'Physics' },
        { value: 'math', label: 'Mathematics' }
    ];

    classOptions = [
        { value: 'all', label: 'All Classes' },
        { value: 'a', label: 'Section A' },
        { value: 'b', label: 'Section B' }
    ];

    levelOptions = [
        { value: 'all', label: 'All Levels' },
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' }
    ];

    statusOptions = [
        { value: 'all', label: 'All Statuses' },
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
    ];

    // Mock students data
    students = signal<Student[]>([
        { id: '1', name: 'John Smith', email: 'j.smith@university.edu', course: 'Biology 201', progress: 82, mastery: 79, risk: 'Low' },
        { id: '2', name: 'Sarah Johnson', email: 's.johnson@university.edu', course: 'Biology 201', progress: 61, mastery: 54, risk: 'Medium' },
        { id: '3', name: 'David Lee', email: 'david.lee@university.edu', course: 'Physics 102', progress: 93, mastery: 91, risk: 'Low' },
        { id: '4', name: 'Emily Chen', email: 'emily.c@university.edu', course: 'Mathematics 101', progress: 45, mastery: 32, risk: 'High' },
        { id: '5', name: 'Michael Brown', email: 'mbrown99@university.edu', course: 'Biology 201', progress: 78, mastery: 80, risk: 'Low' },
        { id: '6', name: 'Jessica Davis', email: 'jess.davis@university.edu', course: 'Physics 102', progress: 88, mastery: 85, risk: 'Low' },
        { id: '7', name: 'Daniel Miller', email: 'dmiller@university.edu', course: 'Mathematics 101', progress: 55, mastery: 48, risk: 'Medium' }
    ]);

    private router = inject(Router);

    navigateToProfile(id: string) {
        this.router.navigate(['/app/students', id]);
    }
}
