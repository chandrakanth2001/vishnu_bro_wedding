export const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxPTXDT-rbefIPc6d24rvjrNLjzx5l06vp7ZmYU1xjV2eCgMtW51UxQghDfzjoQGu7QCw/exec';

export interface GoogleSheetWish {
  id: string;
  author: string;
  message: string;
  date?: string;
  relation?: string;
}

export interface GoogleSheetRSVP {
  type: 'rsvp';
  name: string;
  emailOrPhone?: string;
  attending: string;
  guestsCount: number;
  dietary?: string;
  message?: string;
}

export async function sendRSVPToGoogleSheet(rsvp: GoogleSheetRSVP): Promise<boolean> {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(rsvp),
    });
    return true;
  } catch (err) {
    console.warn('Error sending RSVP to Google Sheet:', err);
    return false;
  }
}

export async function sendWishToGoogleSheet(wish: { type: 'wish'; author: string; message: string }): Promise<boolean> {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(wish),
    });
    return true;
  } catch (err) {
    console.warn('Error sending Wish to Google Sheet:', err);
    return false;
  }
}

export async function fetchWishesFromGoogleSheet(): Promise<GoogleSheetWish[]> {
  try {
    const res = await fetch(GOOGLE_SCRIPT_URL);
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) {
      return data;
    }
    return [];
  } catch (err) {
    console.warn('Error fetching wishes from Google Sheet:', err);
    return [];
  }
}
