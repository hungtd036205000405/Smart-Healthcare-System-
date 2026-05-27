import { motion } from 'motion/react';
import {
  Stethoscope,
  Heart,
  Baby,
  Brain,
  Eye,
  Bone,
  Microscope,
  Syringe,
  Pill,
  Activity,
  UserCheck,
  Smartphone,
  Clock,
  Shield,
  Star,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
  const mainServices = [
    {
      id: 'general',
      icon: Stethoscope,
      title: 'Khám Tổng Quát',
      description: 'Khám sức khỏe định kỳ toàn diện với đội ngũ bác sĩ giàu kinh nghiệm',
      price: 'Từ 200,000đ',
      duration: '30-45 phút',
      features: [
        'Khám lâm sàng toàn diện',
        'Đo huyết áp, nhịp tim',
        'Tư vấn sức khỏe cá nhân',
        'Kê đơn thuốc nếu cần'
      ],
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'cardiology',
      icon: Heart,
      title: 'Khám Tim Mạch',
      description: 'Chẩn đoán và điều trị các bệnh lý tim mạch với công nghệ hiện đại',
      price: 'Từ 350,000đ',
      duration: '45-60 phút',
      features: [
        'Siêu âm tim Doppler',
        'Điện tim đồ 12 chuyển đạo',
        'Holter 24h',
        'Đánh giá nguy cơ tim mạch'
      ],
      image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      id: 'pediatrics',
      icon: Baby,
      title: 'Khám Nhi Khoa',
      description: 'Chăm sóc sức khỏe toàn diện cho trẻ em từ sơ sinh đến 16 tuổi',
      price: 'Từ 250,000đ',
      duration: '30-40 phút',
      features: [
        'Khám sức khỏe định kỳ',
        'Tư vấn dinh dưỡng',
        'Tiêm chủng đầy đủ',
        'Theo dõi phát triển'
      ],
      image: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=800&h=600&fit=crop',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'neurology',
      icon: Brain,
      title: 'Khám Thần Kinh',
      description: 'Chẩn đoán và điều trị các bệnh lý thần kinh, đau đầu, chóng mặt',
      price: 'Từ 400,000đ',
      duration: '45-60 phút',
      features: [
        'Đánh giá chức năng thần kinh',
        'Điện não đồ (EEG)',
        'Chụp MRI não',
        'Điều trị đau đầu, đau dây thần kinh'
      ],
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'ophthalmology',
      icon: Eye,
      title: 'Khám Mắt',
      description: 'Khám và điều trị các bệnh lý về mắt, đo thị lực chính xác',
      price: 'Từ 300,000đ',
      duration: '30-45 phút',
      features: [
        'Đo thị lực, nhãn áp',
        'Khám đáy mắt',
        'Phát hiện tật khúc xạ',
        'Tư vấn kính mắt/kính áp tròng'
      ],
      image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800&h=600&fit=crop',
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      id: 'orthopedics',
      icon: Bone,
      title: 'Khám Xương Khớp',
      description: 'Điều trị chấn thương, đau khớp, và các bệnh lý cơ xương khớp',
      price: 'Từ 350,000đ',
      duration: '40-50 phút',
      features: [
        'Chẩn đoán chấn thương',
        'Chụp X-quang kỹ thuật số',
        'Siêu âm cơ xương khớp',
        'Vật lý trị liệu'
      ],
      image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=600&fit=crop',
      gradient: 'from-teal-500 to-cyan-500'
    }
  ];

  const additionalServices = [
    {
      icon: Microscope,
      title: 'Xét nghiệm',
      description: 'Xét nghiệm máu, nước tiểu, phân với kết quả nhanh chóng',
      link: '/services/lab-test'
    },
    {
      icon: Syringe,
      title: 'Tiêm chủng',
      description: 'Tiêm phòng đầy đủ cho trẻ em và người lớn',
      link: '/services/vaccination'
    },
    {
      icon: Pill,
      title: 'Nhà thuốc',
      description: 'Cung cấp thuốc chính hãng với giá cả hợp lý',
      link: '/services/pharmacy'
    },
    {
      icon: Activity,
      title: 'Theo dõi sức khỏe',
      description: 'Giám sát chỉ số sức khỏe 24/7 qua ứng dụng',
      link: '/patient/health-tracking'
    },
    {
      icon: UserCheck,
      title: 'Chăm sóc tại nhà',
      description: 'Dịch vụ chăm sóc và điều dưỡng tại nhà',
      link: '/services/home-care'
    },
    {
      icon: Smartphone,
      title: 'Tư vấn trực tuyến',
      description: 'Tư vấn sức khỏe qua video call với bác sĩ',
      link: '/patient/consultation'
    }
  ];

  const packages = [
    {
      name: 'Gói Cơ Bản',
      price: '1,500,000đ',
      description: 'Phù hợp cho người dưới 40 tuổi',
      features: [
        'Khám lâm sàng tổng quát',
        'Xét nghiệm máu cơ bản (12 chỉ số)',
        'Xét nghiệm nước tiểu',
        'Điện tim',
        'X-quang phổi',
        'Siêu âm bụng tổng quát',
        'Tư vấn kết quả'
      ],
      popular: false
    },
    {
      name: 'Gói Toàn Diện',
      price: '3,500,000đ',
      description: 'Khám sức khỏe toàn diện cho mọi lứa tuổi',
      features: [
        'Tất cả dịch vụ gói Cơ Bản',
        'Xét nghiệm máu mở rộng (25 chỉ số)',
        'Marker ung thư (CEA, AFP, CA19-9)',
        'Chức năng gan, thận, lipid máu',
        'Siêu âm tim Doppler',
        'Nội soi dạ dày không đau',
        'Chụp CT phổi liều thấp',
        'Tư vấn dinh dưỡng cá nhân hóa'
      ],
      popular: true
    },
    {
      name: 'Gói VIP',
      price: '6,500,000đ',
      description: 'Chăm sóc sức khỏe cao cấp với bác sĩ giỏi',
      features: [
        'Tất cả dịch vụ gói Toàn Diện',
        'Khám với Giáo sư/Phó Giáo sư',
        'Xét nghiệm gen BRCA (ung thư)',
        'MRI não và cột sống',
        'PET/CT toàn thân',
        'Đánh giá nguy cơ tim mạch',
        'Phòng chờ VIP riêng',
        'Theo dõi sức khỏe 6 tháng'
      ],
      popular: false
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Đặt lịch linh hoạt',
      description: 'Chọn thời gian phù hợp, không phải chờ đợi lâu'
    },
    {
      icon: Shield,
      title: 'Bảo mật tuyệt đối',
      description: 'Thông tin bệnh án được mã hóa và bảo vệ'
    },
    {
      icon: Star,
      title: 'Chất lượng hàng đầu',
      description: 'Đội ngũ bác sĩ giàu kinh nghiệm, trang thiết bị hiện đại'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Dịch Vụ Y Tế Chuyên Nghiệp
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
              Chăm sóc sức khỏe toàn diện với công nghệ hiện đại và đội ngũ y bác sĩ hàng đầu
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Dịch Vụ Khám Chuyên Khoa
            </h2>
            <p className="text-xl text-gray-600">
              Đội ngũ bác sĩ chuyên môn cao, trang thiết bị y tế tiên tiến
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-60`}></div>
                  <div className="absolute top-4 right-4 size-14 bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <service.icon className="size-7 text-gray-800" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>

                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">Giá:</span>
                      <span className="ml-2 font-semibold text-blue-600">{service.price}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Thời gian:</span>
                      <span className="ml-2 font-medium text-gray-700">{service.duration}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-700 mb-2">Bao gồm:</div>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <div className="size-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="size-2 rounded-full bg-green-600"></div>
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/patient/booking"
                    className="block w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl text-center font-medium hover:shadow-lg transition-all group"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Đặt lịch ngay
                      <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Dịch Vụ Bổ Sung
            </h2>
            <p className="text-xl text-gray-600">
              Hỗ trợ toàn diện cho sức khỏe của bạn
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="size-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="size-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Packages */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Gói Khám Sức Khỏe
            </h2>
            <p className="text-xl text-gray-600">
              Tiết kiệm chi phí với các gói khám tổng quát
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-2xl overflow-hidden ${
                  pkg.popular
                    ? 'border-4 border-blue-500 shadow-2xl scale-105'
                    : 'border-2 border-gray-200 shadow-lg'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 text-sm font-medium rounded-bl-xl">
                    Phổ biến nhất
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-6">{pkg.description}</p>

                  <div className="mb-6">
                    <div className="text-4xl font-bold text-gray-900">{pkg.price}</div>
                    <div className="text-sm text-gray-500">Một lần khám</div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="size-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="size-2.5 rounded-full bg-green-600"></div>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/patient/booking"
                    className={`block w-full py-4 rounded-xl text-center font-semibold transition-all ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-xl'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Chọn gói này
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="size-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="size-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Đặt lịch ngay hôm nay để được tư vấn và khám bệnh với đội ngũ y bác sĩ chuyên nghiệp
            </p>
            <Link
              to="/patient/booking"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl hover:shadow-2xl transition-all font-semibold text-lg"
            >
              Đặt lịch khám ngay
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
