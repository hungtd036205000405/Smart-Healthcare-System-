import { motion } from 'motion/react';
import { useState } from 'react';
import { Search, Calendar, Video, FileText, Shield, Clock, Award, Users, ArrowRight, Star, CheckCircle2, Activity } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate('/doctors', { state: { searchQuery } });
    }
  };

  const handleSpecialtyClick = (specialty: string) => {
    navigate('/doctors', { state: { specialty } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-500/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Chăm sóc sức khỏe
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Thông minh & Tiện lợi
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Kết nối với đội ngũ bác sĩ chuyên môn cao, đặt lịch nhanh chóng, tư vấn trực tuyến 24/7.
                Hệ thống quản lý sức khỏe điện tử toàn diện.
              </p>

              {/* Search Bar */}
              <div className="bg-white rounded-2xl shadow-xl p-2 mb-8">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                    <Search className="size-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="Tìm bác sĩ, chuyên khoa hoặc triệu chứng..."
                      className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                  >
                    Tìm kiếm
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-600">Bác sĩ</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-600">50K+</div>
                  <div className="text-sm text-gray-600">Bệnh nhân</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">4.9/5</div>
                  <div className="text-sm text-gray-600">Đánh giá</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -top-10 -right-10 size-72 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 size-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop"
                  alt="Doctor consultation"
                  className="relative rounded-2xl shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Tính năng nổi bật
            </h2>
            <p className="text-xl text-gray-600">
              Giải pháp chăm sóc sức khỏe toàn diện với công nghệ hiện đại
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Calendar,
                title: 'Đặt lịch nhanh',
                description: 'Đặt lịch khám chỉ trong 3 bước đơn giản',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: Video,
                title: 'Tư vấn trực tuyến',
                description: 'Video call với bác sĩ mọi lúc mọi nơi',
                color: 'from-cyan-500 to-cyan-600'
              },
              {
                icon: FileText,
                title: 'Hồ sơ điện tử',
                description: 'Quản lý hồ sơ sức khỏe tập trung',
                color: 'from-green-500 to-green-600'
              },
              {
                icon: Shield,
                title: 'Bảo mật cao',
                description: 'Mã hóa và bảo vệ thông tin bệnh nhân',
                color: 'from-purple-500 to-purple-600'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-transparent hover:shadow-xl transition-all cursor-pointer"
              >
                <div className={`size-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="size-7 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Chuyên khoa
            </h2>
            <p className="text-xl text-gray-600">
              Đội ngũ bác sĩ chuyên môn cao trong nhiều lĩnh vực
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Tim mạch', gradient: 'from-red-500 to-pink-500' },
              { name: 'Nhi khoa', gradient: 'from-green-500 to-emerald-500' },
              { name: 'Da liễu', gradient: 'from-purple-500 to-pink-500' },
              { name: 'Tiêu hóa', gradient: 'from-orange-500 to-amber-500' },
              { name: 'Thần kinh', gradient: 'from-indigo-500 to-purple-500' },
              { name: 'Mắt', gradient: 'from-blue-500 to-cyan-500' },
              { name: 'Tai mũi họng', gradient: 'from-teal-500 to-green-500' },
              { name: 'Xương khớp', gradient: 'from-cyan-500 to-blue-500' },
              { name: 'Nội tiết', gradient: 'from-yellow-500 to-orange-500' },
              { name: 'Phụ sản', gradient: 'from-pink-500 to-rose-500' },
              { name: 'Răng hàm mặt', gradient: 'from-gray-500 to-slate-500' },
              { name: 'Y học cổ truyền', gradient: 'from-green-600 to-teal-600' }
            ].map((specialty, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleSpecialtyClick(specialty.name)}
                className="p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer text-center group"
              >
                <div className={`size-12 bg-gradient-to-br ${specialty.gradient} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <Activity className="size-6 text-white" />
                </div>
                <div className="text-sm font-medium text-gray-700">{specialty.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Doctors Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Đội ngũ bác sĩ hàng đầu
            </h2>
            <p className="text-xl text-gray-600">
              Bác sĩ giàu kinh nghiệm, tận tâm và được đánh giá cao
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'BS. Nguyễn Văn An',
                specialty: 'Tim mạch',
                experience: '15 năm kinh nghiệm',
                rating: 4.9,
                reviews: 342,
                image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop'
              },
              {
                name: 'BS. Trần Thị Bình',
                specialty: 'Nhi khoa',
                experience: '12 năm kinh nghiệm',
                rating: 5.0,
                reviews: 428,
                image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop'
              },
              {
                name: 'BS. Lê Minh Cường',
                specialty: 'Da liễu',
                experience: '10 năm kinh nghiệm',
                rating: 4.8,
                reviews: 256,
                image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop'
              },
              {
                name: 'BS. Phạm Thu Dung',
                specialty: 'Phụ sản',
                experience: '18 năm kinh nghiệm',
                rating: 4.9,
                reviews: 512,
                image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop'
              }
            ].map((doctor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="size-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{doctor.name}</h3>
                  <p className="text-blue-600 text-sm mb-2">{doctor.specialty}</p>
                  <p className="text-gray-600 text-sm mb-3">{doctor.experience}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="size-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium text-gray-900">{doctor.rating}</span>
                      <span className="text-gray-500 text-sm">({doctor.reviews})</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                      Đặt lịch <ArrowRight className="size-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Cách thức hoạt động
            </h2>
            <p className="text-xl text-gray-600">
              Đặt lịch khám chỉ với 3 bước đơn giản
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Chọn bác sĩ & Chuyên khoa',
                description: 'Tìm kiếm và lựa chọn bác sĩ phù hợp với triệu chứng của bạn',
                icon: Search
              },
              {
                step: '02',
                title: 'Chọn thời gian',
                description: 'Xem lịch trống và chọn khung giờ phù hợp nhất',
                icon: Calendar
              },
              {
                step: '03',
                title: 'Xác nhận & Khám',
                description: 'Thanh toán và nhận xác nhận lịch hẹn qua email/SMS',
                icon: CheckCircle2
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all">
                  <div className="text-6xl font-bold text-blue-100 mb-4">{item.step}</div>
                  <div className="size-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                    <item.icon className="size-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 text-blue-300">
                    <ArrowRight className="size-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Sẵn sàng chăm sóc sức khỏe của bạn?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Đăng ký ngay hôm nay để trải nghiệm dịch vụ y tế thông minh,
              kết nối với hàng nghìn bác sĩ giàu kinh nghiệm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:shadow-xl transition-all font-semibold text-lg"
              >
                Đăng ký miễn phí
              </Link>
              <Link
                to="/booking"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-600 transition-all font-semibold text-lg"
              >
                Đặt lịch ngay
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Tại sao chọn MediCare?
              </h2>
              <div className="space-y-4">
                {[
                  {
                    icon: Clock,
                    title: 'Tiết kiệm thời gian',
                    description: 'Đặt lịch online, không cần xếp hàng chờ đợi'
                  },
                  {
                    icon: Award,
                    title: 'Chất lượng cao',
                    description: 'Đội ngũ bác sĩ được đào tạo bài bản, giàu kinh nghiệm'
                  },
                  {
                    icon: Users,
                    title: 'Hỗ trợ 24/7',
                    description: 'Tư vấn y tế trực tuyến bất cứ lúc nào bạn cần'
                  },
                  {
                    icon: Shield,
                    title: 'An toàn & Bảo mật',
                    description: 'Thông tin cá nhân được bảo vệ tuyệt đối'
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <div className="size-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="size-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop"
                alt="Medical team"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
