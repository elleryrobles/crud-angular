import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

export const tokenGuard = () => {

  const router = inject(Router);

    if (localStorage.getItem('token_crud')) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }