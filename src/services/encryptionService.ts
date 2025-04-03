
// Mock encryption service - in a real app, this would use the Crypto API
// This is just a placeholder to simulate encryption/decryption operations

/**
 * Simulate encrypting a file
 * In a real app, this would use the Web Crypto API or similar
 */
export async function encryptFile(
  file: File,
  password: string
): Promise<{ encrypted: Blob; iv: string }> {
  // Simulating encryption delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // This is just a mock - In a real app, we'd use proper encryption
  console.log(`Encrypting file "${file.name}" with password "${password}"`);
  
  // Return the original file as a mock of the "encrypted" file
  // (In a real app, this would be the encrypted data)
  return {
    encrypted: file,
    iv: generateMockIV() // Initialization vector would be needed for decryption
  };
}

/**
 * Simulate decrypting a file
 * In a real app, this would use the Web Crypto API or similar
 */
export async function decryptFile(
  encryptedFile: Blob,
  password: string,
  iv: string
): Promise<Blob> {
  // Simulating decryption delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // This is just a mock - In a real app, we'd use proper decryption
  console.log(`Decrypting file with password "${password}" and IV "${iv}"`);
  
  // Return the input file as a mock of the "decrypted" file
  // (In a real app, this would be the decrypted data)
  return encryptedFile;
}

/**
 * Generate a mock initialization vector
 * In a real app, this would be a cryptographically secure random value
 */
function generateMockIV(): string {
  return Array.from(new Array(16))
    .map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Validate a password for strength
 */
export function validatePassword(password: string): { 
  valid: boolean; 
  message?: string;
} {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' };
  }
  
  // Check for a mix of character types
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  
  if (!(hasLower && hasUpper && hasNumber)) {
    return { 
      valid: false, 
      message: 'Password must contain lowercase, uppercase, and numbers'
    };
  }
  
  if (!hasSpecial) {
    return { 
      valid: false, 
      message: 'Password must contain at least one special character'
    };
  }
  
  return { valid: true };
}

/**
 * Calculate estimated strength of a password
 * Returns a value between 0 and 100
 */
export function passwordStrength(password: string): number {
  if (!password) return 0;
  
  let strength = 0;
  
  // Length contribution (up to 40 points)
  strength += Math.min(password.length * 4, 40);
  
  // Character variety contribution
  if (/[a-z]/.test(password)) strength += 10; // lowercase
  if (/[A-Z]/.test(password)) strength += 10; // uppercase
  if (/[0-9]/.test(password)) strength += 10; // digits
  if (/[^a-zA-Z0-9]/.test(password)) strength += 15; // special chars
  
  // Patterns reduce strength
  if (/(.)\1{2,}/.test(password)) strength -= 10; // repeated characters
  if (/^[a-zA-Z]+$/.test(password)) strength -= 10; // letters only
  if (/^[0-9]+$/.test(password)) strength -= 10; // numbers only
  
  // Common patterns
  if (/^(password|12345|qwerty)/i.test(password)) strength -= 20;
  
  // Ensure the result is between 0 and 100
  return Math.max(0, Math.min(100, strength));
}
