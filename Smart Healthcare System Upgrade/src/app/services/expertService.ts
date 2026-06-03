import { simulateApiCall } from "./apiUtils";

export interface Conversation {
  id: number;
  user: string;
  topic: string;
  date: string;
  status: "ongoing" | "resolved" | "escalated";
  sentiment: "positive" | "neutral" | "negative";
  rating: number;
  hasError: boolean;
  messages: Array<{ role: "user" | "bot"; text: string; time: string }>;
}

export const expertService = {
  async getConversations(expertId: string): Promise<Conversation[]> {
    const mockConversations = [
      {
        id: 1,
        user: "Nguyễn Văn A",
        topic: "Tư vấn chế độ ăn uống",
        date: "2026-05-07 09:30",
        status: "resolved" as const,
        sentiment: "positive" as const,
        rating: 5,
        hasError: false,
        messages: [
          {
            role: "user",
            text: "Tôi cần tư vấn về chế độ ăn uống để giảm cân",
            time: "09:30",
          },
          {
            role: "bot",
            text: "Tôi hi vọng bạn đang bận rộn. Bạn có thể cho tôi biết thêm thông tin?",
            time: "09:30",
          },
          { role: "user", text: "Tôi đang rất cần", time: "09:31" },
          {
            role: "bot",
            text: "Bạn có thể cho tôi biết thêm chi tiết?",
            time: "09:31",
          },
          { role: "user", text: "Tôi cần giúp đỡ", time: "09:32" },
        ],
      },
      {
        id: 2,
        user: "Trần Thị B",
        topic: "Hỏi về bài tập thể dục",
        date: "2026-05-07 10:15",
        status: "resolved" as const,
        sentiment: "positive" as const,
        rating: 4,
        hasError: false,
        messages: [
          {
            role: "user",
            text: "Tôi muốn biết thêm về bài tập thể dục",
            time: "10:15",
          },
          {
            role: "bot",
            text: "Bạn có thể cho tôi biết bạn đang tìm kiếm gì?",
            time: "10:15",
          },
        ],
      },
      {
        id: 3,
        user: "Lê Văn C",
        topic: "Tư vấn sức khỏe tâm thần",
        date: "2026-05-28 16:45",
        status: "ongoing" as const,
        sentiment: "neutral" as const,
        rating: 0,
        hasError: false,
        messages: [
          { role: "user", text: "Tôi cảm thấy không ổn", time: "16:45" },
          {
            role: "bot",
            text: "Bạn có thể chia sẻ thêm không?",
            time: "16:45",
          },
        ],
      },
      {
        id: 4,
        user: "Phạm Thị D",
        topic: "Hỏi về triệu chứng sốt",
        date: "2026-05-26 09:20",
        status: "escalated" as const,
        sentiment: "negative" as const,
        rating: 2,
        hasError: true,
        messages: [
          { role: "user", text: "Tôi bị sốt", time: "09:20" },
          {
            role: "bot",
            text: "Xin lỗi, tôi không thể giúp. Bạn có thể nói rõ hơn không?",
            time: "09:20",
          },
          { role: "user", text: "Tôi cảm thấy rất mệt", time: "09:21" },
        ],
      },
      {
        id: 5,
        user: "Hoàng Văn E",
        topic: "Tư vấn cân nặng",
        date: "2026-05-25 15:00",
        status: "resolved" as const,
        sentiment: "positive" as const,
        rating: 5,
        hasError: false,
        messages: [
          { role: "user", text: "Tôi muốn giảm cân", time: "15:00" },
          {
            role: "bot",
            text: "Bạn có thể cho tôi biết thêm chi tiết?",
            time: "15:01",
          },
        ],
      },
    ];

    // Replace with: return fetchFromAPI(`/experts/${expertId}/conversations`);
    return simulateApiCall(mockConversations);
  },

  async getAnalytics(expertId: string) {
    const mockAnalytics = {
      totalConversations: 487,
      averageRating: 4.6,
      resolvedRate: 92,
      averageResolutionTime: "4.5 hours",
      topTopics: [
        { topic: "Dinh dưỡng", count: 123 },
        { topic: "Thể dục", count: 98 },
        { topic: "Tâm lý", count: 87 },
        { topic: "Ngủ", count: 65 },
      ],
      sentimentBreakdown: {
        positive: 72,
        neutral: 18,
        negative: 10,
      },
    };

    // Replace with: return fetchFromAPI(`/experts/${expertId}/analytics`);
    return simulateApiCall(mockAnalytics);
  },

  async getConversationDetail(conversationId: number) {
    const mockDetail = {
      id: conversationId,
      user: "Nguyễn Văn A",
      topic: "Tư vấn chế độ ăn uống",
      status: "resolved",
      messages: [
        {
          id: 1,
          sender: "user",
          text: "Tôi cần tư vấn về chế độ ăn uống để giảm cân",
          timestamp: "2026-05-28 14:30",
        },
        {
          id: 2,
          sender: "expert",
          text: "Chào bạn! Tôi sẵn sàng giúp bạn. Bạn có thể bắt đầu bằng cách giảm calo hàng ngày khoảng 300-500 calo...",
          timestamp: "2026-05-28 14:35",
        },
        {
          id: 3,
          sender: "user",
          text: "Cảm ơn, điều này rất hữu ích",
          timestamp: "2026-05-28 14:45",
        },
      ],
      rating: 5,
      feedback: "Rất hài lòng với tư vấn",
    };

    // Replace with: return fetchFromAPI(`/conversations/${conversationId}`);
    return simulateApiCall(mockDetail);
  },
};
