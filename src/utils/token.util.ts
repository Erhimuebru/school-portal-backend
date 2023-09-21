import * as jwt from 'jsonwebtoken';

// Function to extract the userId from the token
function getUserIdFromToken(token: string): string | null {
  try {
    // Verify and decode the token
    const decodedToken: any = jwt.verify(token, 'your_secret_key_here');

    // Extract the userId from the decoded token
    const userId: string = decodedToken.userId;

    return userId;
  } catch (error) {
    // Return null if the token is invalid or there's an error
    return null;
  }
}
export { getUserIdFromToken };