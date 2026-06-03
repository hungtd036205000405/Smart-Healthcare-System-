// Mock API Service Layer
// Dễ dàng chuyển sang real backend API sau bằng cách thay đổi các function này

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Utility function to simulate API calls
async function simulateApiCall<T>(data: T, delay: number = 300): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
}

// Actual API fetch function (ready for real backend)
export async function fetchFromAPI(endpoint: string, options?: RequestInit) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    // Return mock data as fallback during development
    return null;
  }
}

export const commonService = {
  // This can be replaced with real API calls
  async fetchDoctorsBySpecialty(specialty: string) {
    const mockDoctors = [
      {
        id: 1,
        name: "BS. Nguyễn Văn An",
        specialty: specialty,
        experience: "15 năm",
        rating: 4.9,
        reviews: 342,
        price: "300,000đ",
        image:
          "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400",
        phone: "0901234567",
        location: "Bệnh viện A",
      },
      {
        id: 2,
        name: "BS. Trần Thị Bình",
        specialty: specialty,
        experience: "12 năm",
        rating: 4.8,
        reviews: 298,
        price: "280,000đ",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
        phone: "0902345678",
        location: "Bệnh viện B",
      },
      {
        id: 3,
        name: "BS. Lê Minh Cường",
        specialty: specialty,
        experience: "20 năm",
        rating: 4.95,
        reviews: 512,
        price: "400,000đ",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        phone: "0903456789",
        location: "Bệnh viện C",
      },
    ];

    // In real app, replace this with: return fetchFromAPI(`/doctors?specialty=${specialty}`);
    return simulateApiCall(mockDoctors);
  },

  async getAllSpecialties() {
    const specialties = [
      "Tim mạch",
      "Nhi khoa",
      "Da liễu",
      "Tiêu hóa",
      "Thần kinh",
      "Mắt",
      "Tai mũi họng",
      "Sản phụ khoa",
      "Chỉnh hình",
    ];

    return simulateApiCall(specialties);
  },
};
