
import { User, UserRole } from '../types';

// Mock database for simulation
const ADMIN_CREDENTIALS = {
  email: 'admin@nurulquran.com',
  password: 'admin-password-2025'
};

// Simulation of a persistence layer
const getMockDB = () => {
  const db = localStorage.getItem('nurul_quran_mock_users');
  return db ? JSON.parse(db) : {};
};

const saveToMockDB = (email: string, userData: any) => {
  const db = getMockDB();
  db[email.toLowerCase()] = userData;
  localStorage.setItem('nurul_quran_mock_users', JSON.stringify(db));
};

export class ApiService {
  /**
   * Simulates a POST /api/login endpoint
   */
  static async login(email: string, password: string): Promise<{ user: User; token: string }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const lowerEmail = email.toLowerCase();
        
        // Hardcoded protection for Admin endpoint logic
        if (lowerEmail === ADMIN_CREDENTIALS.email) {
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

        // Check mock database for signed up users
        const db = getMockDB();
        const existingUser = db[lowerEmail];
        
        if (existingUser) {
          if (existingUser.password === password) {
            resolve({
              user: {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
                isOnline: true
              },
              token: `simulated-jwt-${existingUser.role.toLowerCase()}-token`
            });
            return;
          } else {
            reject(new Error('Incorrect password. Please try again.'));
            return;
          }
        }

        // Generic mock for hardcoded test roles if not in DB
        if (lowerEmail.includes('teacher') || lowerEmail.includes('student')) {
          const role: UserRole = lowerEmail.includes('teacher') ? 'TEACHER' : 'STUDENT';
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
          return;
        }

        reject(new Error('User not found. Please sign up first.'));
      }, 1000);
    });
  }

  /**
   * Simulates a POST /api/signup endpoint
   */
  static async signup(userData: any): Promise<{ user: User; token: string }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const db = getMockDB();
        if (db[userData.email.toLowerCase()]) {
          reject(new Error('Email already registered.'));
          return;
        }

        const newUser = {
          ...userData,
          id: Math.random().toString(36).substr(2, 9),
          role: userData.role || 'STUDENT'
        };

        saveToMockDB(userData.email, newUser);

        resolve({
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            isOnline: true
          },
          token: `simulated-jwt-${newUser.role.toLowerCase()}-token`
        });
      }, 1500);
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
