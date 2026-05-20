import { motion } from 'motion/react';
import { useState } from 'react';
import { Search, Filter, Star, MapPin, Award, Clock, Calendar, MessageSquare, Video, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const specialties = [
    { value: 'all', label: 'Tất cả chuyên khoa' },
    { value: 'cardiology', label: 'Tim mạch' },
    { value: 'pediatrics', label: 'Nhi khoa' },
    { value: 'dermatology', label: 'Da liễu' },
    { value: 'neurology', label: 'Thần kinh' },
    { value: 'orthopedics', label: 'Xương khớp' },
    { value: 'ophthalmology', label: 'Mắt' },
    { value: 'gastroenterology', label: 'Tiêu hóa' },
    { value: 'endocrinology', label: 'Nội tiết' }
  ];

  const doctors = [
    {
      id: 1,
      name: 'BS. Nguyễn Văn An',
      specialty: 'Tim mạch',
      degree: 'Tiến sĩ Y khoa',
      experience: 15,
      rating: 4.9,
      reviews: 342,
      languages: ['Tiếng Việt', 'English'],
      hospital: 'Bệnh viện Đa khoa MediCare',
      price: 300000,
      available: true,
      nextSlot: '2026-05-10 09:00',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
      about: 'Chuyên gia hàng đầu về tim mạch can thiệp, đã thực hiện hơn 2000 ca can thiệp mạch vành thành công.',
      achievements: ['Top 10 Bác sĩ Tim mạch VN 2025', 'Giải thưởng Y đức 2024'],
      education: ['Đại học Y Hà Nội', 'Thạc sĩ - ĐH Johns Hopkins (Mỹ)']
    },
    {
      id: 2,
      name: 'BS. Trần Thị Bình',
      specialty: 'Nhi khoa',
      degree: 'Thạc sĩ Y khoa',
      experience: 12,
      rating: 5.0,
      reviews: 428,
      languages: ['Tiếng Việt', 'English', '日本語'],
      hospital: 'Bệnh viện Nhi đồng MediCare',
      price: 350000,
      available: true,
      nextSlot: '2026-05-10 14:00',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
      about: 'Chuyên điều trị các bệnh lý hô hấp, tiêu hóa và dị ứng ở trẻ em. Tận tâm với từng bệnh nhân nhỏ tuổi.',
      achievements: ['Bác sĩ được yêu thích nhất 2025', 'Chứng chỉ Nhi khoa Quốc tế'],
      education: ['Đại học Y Dược TP.HCM', 'Đào tạo tại Nhật Bản']
    },
    {
      id: 3,
      name: 'PGS.TS. Lê Minh Cường',
      specialty: 'Da liễu',
      degree: 'Phó Giáo sư, Tiến sĩ',
      experience: 20,
      rating: 4.8,
      reviews: 256,
      languages: ['Tiếng Việt', 'English', 'Français'],
      hospital: 'Trung tâm Da liễu MediCare',
      price: 500000,
      available: true,
      nextSlot: '2026-05-11 10:00',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
      about: 'Chuyên gia về laser thẩm mỹ da và điều trị các bệnh lý da phức tạp. Có kinh nghiệm làm việc tại Pháp 5 năm.',
      achievements: ['Chủ tịch Hội Da liễu TP.HCM', 'Giải thưởng nghiên cứu khoa học 2024'],
      education: ['Đại học Y Paris (Pháp)', 'Hậu tiến sĩ tại Lyon']
    },
    {
      id: 4,
      name: 'BS. Phạm Thu Dung',
      specialty: 'Phụ sản',
      degree: 'Bác sĩ chuyên khoa II',
      experience: 18,
      rating: 4.9,
      reviews: 512,
      languages: ['Tiếng Việt', 'English'],
      hospital: 'Bệnh viện Phụ sản MediCare',
      price: 400000,
      available: false,
      nextSlot: '2026-05-12 08:30',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
      about: 'Chuyên sản khoa cao nguy, theo dõi thai kỳ và điều trị vô sinh hiếm muộn với tỷ lệ thành công cao.',
      achievements: ['Hơn 3000 ca sinh thành công', 'Chuyên gia tư vấn sức khỏe sinh sản'],
      education: ['Đại học Y Huế', 'Thạc sĩ - Singapore']
    },
    {
      id: 5,
      name: 'BS. Hoàng Minh Tuấn',
      specialty: 'Thần kinh',
      degree: 'Tiến sĩ Y khoa',
      experience: 14,
      rating: 4.7,
      reviews: 189,
      languages: ['Tiếng Việt', 'English', 'Deutsch'],
      hospital: 'Trung tâm Thần kinh MediCare',
      price: 450000,
      available: true,
      nextSlot: '2026-05-10 15:30',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop',
      about: 'Chuyên điều trị đột quỵ, Parkinson, động kinh và đau đầu mạn tính. Đào tạo tại Đức.',
      achievements: ['Chứng chỉ Thần kinh học châu Âu', 'Nghiên cứu về điều trị đột quỵ'],
      education: ['Đại học Y Hà Nội', 'Tiến sĩ - Charité Berlin (Đức)']
    },
    {
      id: 6,
      name: 'BS. Đỗ Thị Mai',
      specialty: 'Mắt',
      degree: 'Thạc sĩ Y khoa',
      experience: 10,
      rating: 4.9,
      reviews: 167,
      languages: ['Tiếng Việt', 'English'],
      hospital: 'Trung tâm Mắt MediCare',
      price: 300000,
      available: true,
      nextSlot: '2026-05-10 11:00',
      image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&h=400&fit=crop',
      about: 'Chuyên phẫu thuật khúc xạ (Lasik, Smile), điều trị đục thủy tinh thể và các bệnh lý võng mạc.',
      achievements: ['Hơn 5000 ca mổ mắt thành công', 'Chứng chỉ Lasik quốc tế'],
      education: ['Đại học Y Dược TP.HCM', 'Đào tạo tại Singapore']
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === specialties.find(s => s.value === selectedSpecialty)?.label;
    const matchesRating = doctor.rating >= minRating;

    return matchesSearch && matchesSpecialty && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 text-white py-16">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Đội Ngũ Bác Sĩ Chuyên Môn Cao
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Hơn 500 bác sĩ giàu kinh nghiệm, tận tâm với từng bệnh nhân
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-2">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                  <Search className="size-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm bác sĩ, chuyên khoa..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium flex items-center gap-2"
                >
                  <Filter className="size-5" />
                  Bộ lọc
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium">
                  Tìm kiếm
                </button>
              </div>

              {/* Filters */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-gray-50 rounded-xl grid md:grid-cols-3 gap-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Chuyên khoa</label>
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      {specialties.map(spec => (
                        <option key={spec.value} value={spec.value}>{spec.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Đánh giá tối thiểu</label>
                    <select
                      value={minRating}
                      onChange={(e) => setMinRating(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value={0}>Tất cả</option>
                      <option value={4.5}>4.5+ sao</option>
                      <option value={4.8}>4.8+ sao</option>
                      <option value={4.9}>4.9+ sao</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ngôn ngữ</label>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="all">Tất cả</option>
                      <option value="vietnamese">Tiếng Việt</option>
                      <option value="english">English</option>
                      <option value="japanese">日本語</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Tìm thấy {filteredDoctors.length} bác sĩ
            </h2>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Đánh giá cao nhất</option>
              <option>Kinh nghiệm nhiều nhất</option>
              <option>Giá thấp đến cao</option>
              <option>Giá cao đến thấp</option>
            </select>
          </div>

          <div className="space-y-6">
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Doctor Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl object-cover"
                      />
                    </div>

                    {/* Doctor Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-blue-600 font-medium">{doctor.specialty}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600">{doctor.degree}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Award className="size-4 text-orange-500" />
                              <span>{doctor.experience} năm kinh nghiệm</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="size-4 text-gray-400" />
                              <span>{doctor.hospital}</span>
                            </div>
                          </div>
                        </div>

                        {doctor.available && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                            <div className="size-2 bg-green-600 rounded-full animate-pulse"></div>
                            Đang trực
                          </span>
                        )}
                      </div>

                      {/* About */}
                      <p className="text-gray-700 mb-4 line-clamp-2">{doctor.about}</p>

                      {/* Achievements */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {doctor.achievements.map((achievement, idx) => (
                          <span key={idx} className="px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-sm border border-amber-200">
                            🏆 {achievement}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="size-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Star className="size-5 text-yellow-500 fill-yellow-500" />
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{doctor.rating}</div>
                            <div className="text-xs text-gray-500">({doctor.reviews} đánh giá)</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="size-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Clock className="size-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{doctor.price.toLocaleString()}đ</div>
                            <div className="text-xs text-gray-500">Giá khám</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="size-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Calendar className="size-5 text-purple-600" />
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 text-sm">{new Date(doctor.nextSlot).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' })}</div>
                            <div className="text-xs text-gray-500">Lịch gần nhất</div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {doctor.languages.slice(0, 2).map((lang, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        <Link
                          to={`/patient/booking?doctor=${doctor.id}`}
                          className="flex-1 min-w-[200px] px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium text-center flex items-center justify-center gap-2"
                        >
                          <Calendar className="size-5" />
                          Đặt lịch khám
                        </Link>
                        <button className="px-6 py-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-all font-medium flex items-center gap-2">
                          <Video className="size-5" />
                          Tư vấn online
                        </button>
                        <button className="px-6 py-3 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-all font-medium flex items-center gap-2">
                          <MessageSquare className="size-5" />
                          Nhắn tin
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
