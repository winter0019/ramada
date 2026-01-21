
import { User, UserRole } from '../types';

// Mock database for simulation
const ADMIN_CREDENTIALS = {
  email: 'admin@nurulquran.com',
  password: 'admin-password-2025'
};

export class ApiService {
  /**
   * Simulates a POST /api/login endpoint
   */
  static async login(email: string, password: string): Promise<{ user: User; token: string }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Hardcoded protection for Admin endpoint logic
        if (email === ADMIN_CREDENTIALS.email) {
          if (password === ADMIN_CREDENTIALS.password) {
            resolve({
              user: {
                id: 'admin-001',
                name: 'System Admin',
                email: email,
                role: 'ADMIN',
                isOnline: true
              },
              token: 'simulated-jwt-admin-token'
            });
          } else {
            reject(new Error('Invalid admin credentials. Access denied.'));
          }
          return;
        }

        // Generic mock for other roles
        const role: UserRole = email.includes('teacher') ? 'TEACHER' : 'STUDENT';
        resolve({
          user: {
            id: Math.random().toString(36).substr(2, 9),
            name: email.split('@')[0],
            email: email,
            role: role,
            isOnline: true
          },
          token: `simulated-jwt-${role.toLowerCase()}-token`
        });
      }, 1000);
    });
  }

  /**
   * Simulates a protected GET /api/admin/stats endpoint
   */
  static async getAdminStats(token: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!token.includes('admin')) {
          reject(new Error('Unauthorized: Admin access only.'));
          return;
        }
        resolve({
          teachers: 1240,
          students: 52100,
          paid_sessions: 8420,
          ongoing_sessions: 42,
          completed_sessions: 156000,
          online_teachers: 18
        });
      }, 800);
    });
  }
}
