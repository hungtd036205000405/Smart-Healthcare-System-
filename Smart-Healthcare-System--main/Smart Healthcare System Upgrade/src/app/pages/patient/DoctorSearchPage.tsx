import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Star, Filter, ChevronRight, User, Calendar, Clock, Video, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import PatientHeader from '../../components/patient/PatientHeader';

export default function DoctorSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [sortBy, setSortBy] = useState('rating');
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const specialties = [
    { id: '', name: 'Tất cả chuyên khoa' },
    { id: 'cardiology', name: 'Tim mạch' },
    { id: 'pediatrics', name: 'Nhi khoa' },
    { id: 'dermatology', name: 'Da liễu' },
    { id: 'gastroenterology', name: 'Tiêu hoá' },
    { id: 'neurology', name: 'Thần kinh' },
    { id: 'ophthalmology', name: 'Mắt' },
    { id: 'orthopedics', name: 'Xương khớp' },
    { id: 'dentistry', name: 'Răng hàm mặt' },
  ];

  const locations = [
    { id: '', name: 'Tất cả địa điểm' },
    { id: 'q1', name: 'Quận 1, TP.HCM' },
    { id: 'q3', name: 'Quận 3, TP.HCM' },
    { id: 'q5', name: 'Quận 5, TP.HCM' },
    { id: 'binhthanh', name: 'Bình Thạnh, TP.HCM' },
    { id: 'thuduc', name: 'Thủ Đức, TP.HCM' },
  ];

  const doctors = [
    {
      id: 1,
      name: 'BS. Nguyễn Văn An',
      specialty: 'Tim mạch',
      specialtyId: 'cardiology',
      experience: '15 năm',
      rating: 4.9,
      reviews: 342,
      price: '300,000',
      location: 'Quận 1, TP.HCM',
      locationId: 'q1',
      hospital: 'Bệnh viện Đa khoa Quốc tế',
      isOnline: true,
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
      education: 'Tiến sĩ Y khoa - ĐH Y dược TP.HCM',
      description: 'Chuyên gia về bệnh tim mạch, huyết áp, rối loạn nhịp tim',
      slotsAvailable: 8,
    },
    {
      id: 2,
      name: 'BS. Trần Thị Bình',
      specialty: 'Nhi khoa',
      specialtyId: 'pediatrics',
      experience: '12 năm',
      rating: 5.0,
      reviews: 428,
      price: '250,000',
      location: 'Quận 3, TP.HCM',
      locationId: 'q3',
      hospital: 'Phòng khám Nhi đồng BigC',
      isOnline: true,
      avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
      education: 'Thạc sĩ Nhi khoa - ĐH Y dược TP.HCM',
      description: 'Chuyên khám và điều trị bệnh cho trẻ em từ 0-15 tuổi',
      slotsAvailable: 5,
    },
    {
      id: 3,
      name: 'BS. Lê Văn Cường',
      specialty: 'Da liễu',
      specialtyId: 'dermatology',
      experience: '10 năm',
      rating: 4.8,
      reviews: 256,
      price: '200,000',
      location: 'Quận 5, TP.HCM',
      locationId: 'q5',
      hospital: 'TT Da liễu Trung ương',
      isOnline: false,
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop',
      education: 'Bác sĩ chuyên khoa II - Da liễu',
      description: 'Chuyên điều trị mụn, nám, sẹo và các bệnh da liễu',
      slotsAvailable: 12,
    },
    {
      id: 4,
      name: 'BS. Phạm Thị Dung',
      specialty: 'Tiêu hoá',
      specialtyId: 'gastroenterology',
      experience: '18 năm',
      rating: 4.9,
      reviews: 512,
      price: '350,000',
      location: 'Bình Thạnh, TP.HCM',
      locationId: 'binhthanh',
      hospital: 'Bệnh viện Ung Bướu TP.HCM',
      isOnline: true,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
      education: 'Giáo sư - Tiến sĩ Y khoa',
      description: 'Chuyên gia hàng đầu về bệnh tiêu hoá, gan mật',
      slotsAvailable: 3,
    },
    {
      id: 5,
      name: 'BS. Hoàng Minh Đức',
      specialty: 'Thần kinh',
      specialtyId: 'neurology',
      experience: '8 năm',
      rating: 4.7,
      reviews: 189,
      price: '280,000',
      location: 'Thủ Đức, TP.HCM',
      locationId: 'thuduc',
      hospital: 'Bệnh viện Quận Thủ Đức',
      isOnline: false,
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&sat=-100',
      education: 'Thạc sĩ Thần kinh - ĐH Y dược TP.HCM',
      description: 'Chuyên khám đau đầu, động kinh, Parkinson',
      slotsAvailable: 6,
    },
    {
      id: 6,
      name: 'BS. Ngô Thị Hoa',
      specialty: 'Mắt',
      specialtyId: 'ophthalmology',
      experience: '20 năm',
      rating: 5.0,
      reviews: 634,
      price: '220,000',
      location: 'Quận 1, TP.HCM',
      locationId: 'q1',
      hospital: 'Bệnh viện Mắt TP.HCM',
      isOnline: true,
      avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&sat=-100',
      education: 'Phó Giáo sư - Bác sĩ chuyên khoa II',
      description: 'Chuyên phẫu thuật cataract, cận thị, glaucoma',
      slotsAvailable: 10,
    },
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      !searchQuery ||
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || doctor.specialtyId === selectedSpecialty;
    const matchesLocation = !selectedLocation || doctor.locationId === selectedLocation;
    const matchesRating = !selectedRating || doctor.rating >= selectedRating;
    const matchesPrice = parseInt(doctor.price.replace(/,/g, '')) >= priceRange[0] && parseInt(doctor.price.replace(/,/g, '')) <= priceRange[1];
    const matchesOnline = !showOnlineOnly || doctor.isOnline;
    return matchesSearch && matchesSpecialty && matchesLocation && matchesRating && matchesPrice && matchesOnline;
  });

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price_low') return parseInt(a.price.replace(/,/g, '')) - parseInt(b.price.replace(/,/g, ''));
    if (sortBy === 'price_high') return parseInt(b.price.replace(/,/g, '')) - parseInt(a.price.replace(/,/g, ''));
    if (sortBy === 'experience') return parseInt(b.experience) - parseInt(a.experience);
    return 0;
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`size-4 ${star <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30">
      <PatientHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tìm kiếm bác sĩ</h1>
          <p className="text-gray-600">Tìm bác sĩ phù hợp với nhu cầu của bạn</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24"
            >
              <div className="flex items-center gap-2 mb-6">
                <Filter className="size-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Bộ lọc</h2>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tên bác sĩ, chuyên khoa..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                </div>
              </div>

              {/* Specialty */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Chuyên khoa</label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                >
                  {specialties.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Địa điểm</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                >
                  {locations.map((l) => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá khám: {priceRange[0].toLocaleString()}đ - {priceRange[1].toLocaleString()}đ
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="range"
                    min={0}
                    max={500000}
                    step={50000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Đánh giá tối thiểu</label>
                <div className="space-y-2">
                  {[4.5, 4, 3.5, 3].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                        selectedRating === rating ? 'bg-blue-50 border border-blue-300' : 'hover:bg-gray-50'
                      }`}
                    >
                      {renderStars(rating)}
                      <span className="text-gray-700">Từ {rating}+</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Online Only */}
              <div className="mb-4">
                <button
                  onClick={() => setShowOnlineOnly(!showOnlineOnly)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    showOnlineOnly
                      ? 'bg-green-50 border-2 border-green-500 text-green-700'
                      : 'bg-gray-50 border-2 border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className={`size-3 rounded-full ${showOnlineOnly ? 'bg-green-500' : 'bg-gray-400'}`} />
                  Chỉ bác sĩ online
                </button>
              </div>

              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpecialty('');
                  setSelectedLocation('');
                  setSelectedRating(null);
                  setPriceRange([0, 500000]);
                  setShowOnlineOnly(false);
                }}
                className="w-full py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                Đặt lại bộ lọc
              </button>
            </motion.div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{sortedDoctors.length}</span> bác sĩ được tìm thấy
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="rating">Đánh giá cao nhất</option>
                  <option value="price_low">Giá thấp nhất</option>
                  <option value="price_high">Giá cao nhất</option>
                  <option value="experience">Kinh nghiệm nhiều nhất</option>
                </select>
              </div>
            </div>

            {/* Doctor Cards */}
            <div className="space-y-4">
              {sortedDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all"
                >
                  <div className="flex gap-5">
                    <div className="relative flex-shrink-0">
                      <img
                        src={doctor.avatar}
                        alt={doctor.name}
                        className="size-24 rounded-xl object-cover"
                      />
                      {doctor.isOnline && (
                        <div className="absolute -bottom-1 -right-1 size-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <div className="size-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
                            {doctor.isOnline && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                Online
                              </span>
                            )}
                          </div>
                          <p className="text-blue-600 font-medium text-sm">{doctor.specialty}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-blue-600">{doctor.price}đ</div>
                          <div className="text-xs text-gray-500">/ buổi khám</div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">{doctor.description}</p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          {renderStars(doctor.rating)}
                          <span className="font-semibold text-gray-900 ml-1">{doctor.rating}</span>
                          <span className="text-gray-500">({doctor.reviews} đánh giá)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="size-4" />
                          <span>{doctor.experience} kinh nghiệm</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="size-4" />
                          <span>{doctor.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                        <User className="size-3" />
                        <span>{doctor.education}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          <span className="text-green-600 font-medium">{doctor.slotsAvailable} lịch trống</span> hôm nay
                        </div>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all flex items-center gap-1">
                            <Video className="size-4" />
                            Khám online
                          </button>
                          <Link
                            to="/patient/booking"
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center gap-1"
                          >
                            <Calendar className="size-4" />
                            Đặt lịch
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {sortedDoctors.length === 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="size-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="size-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy bác sĩ</h3>
                <p className="text-gray-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
