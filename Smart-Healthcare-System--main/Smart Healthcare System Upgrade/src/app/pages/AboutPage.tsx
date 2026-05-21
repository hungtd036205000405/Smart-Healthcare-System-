import { motion } from 'motion/react';
import { Award, Users, Building2, Heart, Shield, Target, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { value: '15+', label: 'Năm kinh nghiệm', icon: Award },
    { value: '500+', label: 'Bác sĩ chuyên môn', icon: Users },
    { value: '24', label: 'Chi nhánh toàn quốc', icon: Building2 },
    { value: '50K+', label: 'Bệnh nhân tin tưởng', icon: Heart }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Tận tâm',
      description: 'Đặt lợi ích của bệnh nhân lên hàng đầu, chăm sóc với trái tim'
    },
    {
      icon: Shield,
      title: 'Uy tín',
      description: 'Cam kết chất lượng dịch vụ y tế và bảo mật thông tin tuyệt đối'
    },
    {
      icon: Target,
      title: 'Chuyên nghiệp',
      description: 'Đội ngũ y bác sĩ giàu kinh nghiệm, trang thiết bị hiện đại'
    },
    {
      icon: Users,
      title: 'Đồng hành',
      description: 'Luôn bên cạnh bạn trong hành trình chăm sóc sức khỏe'
    }
  ];

  const milestones = [
    { year: '2010', event: 'Thành lập bệnh viện đầu tiên tại TP.HCM' },
    { year: '2015', event: 'Mở rộng 10 chi nhánh trên toàn quốc' },
    { year: '2020', event: 'Ra mắt hệ thống đặt lịch và tư vấn trực tuyến' },
    { year: '2023', event: 'Đạt chứng nhận JCI về chất lượng y tế quốc tế' },
    { year: '2026', event: 'Phát triển AI hỗ trợ chẩn đoán và hồ sơ sức khỏe điện tử' }
  ];

  const team = [
    {
      name: 'GS.TS. Nguyễn Văn A',
      position: 'Giám đốc Y khoa',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
      bio: 'Hơn 30 năm kinh nghiệm trong lĩnh vực tim mạch'
    },
    {
      name: 'BS. Trần Thị B',
      position: 'Trưởng khoa Nhi',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
      bio: 'Chuyên gia hàng đầu về nhi khoa tại Việt Nam'
    },
    {
      name: 'ThS. Lê Văn C',
      position: 'Giám đốc Điều hành',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
      bio: 'MBA từ Harvard, dẫn dắt MediCare phát triển bền vững'
    },
    {
      name: 'BS. Phạm Thị D',
      position: 'Trưởng khoa Phụ sản',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
      bio: 'Chuyên gia về sản khoa cao nguy và điều trị vô sinh'
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
              Về MediCare
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
              Hệ thống y tế hàng đầu Việt Nam, mang đến dịch vụ chăm sóc sức khỏe chất lượng quốc tế
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center hover:shadow-lg transition-all"
              >
                <div className="size-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="size-8 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop"
                alt="Hospital"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Sứ mệnh của chúng tôi
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                MediCare được thành lập với sứ mệnh mang đến dịch vụ chăm sóc sức khỏe chất lượng cao,
                dễ tiếp cận cho mọi người dân Việt Nam. Chúng tôi tin rằng mọi người đều xứng đáng được
                chăm sóc y tế tốt nhất với chi phí hợp lý.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Với đội ngũ y bác sĩ giàu kinh nghiệm, trang thiết bị y tế hiện đại và công nghệ số tiên tiến,
                chúng tôi không ngừng cải tiến để đem lại trải nghiệm khám chữa bệnh tốt nhất cho bệnh nhân.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="size-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <value.icon className="size-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{value.title}</h3>
                      <p className="text-sm text-gray-600">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Hành trình phát triển
            </h2>
            <p className="text-xl text-gray-600">
              Những cột mốc quan trọng trong sự phát triển của MediCare
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-cyan-500 -translate-x-1/2"></div>

            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all">
                    <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                    <p className="text-gray-700">{milestone.event}</p>
                  </div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 size-6 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full border-4 border-white shadow-lg"></div>

                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ban lãnh đạo
            </h2>
            <p className="text-xl text-gray-600">
              Đội ngũ lãnh đạo giàu kinh nghiệm và tâm huyết
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 text-sm mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Chứng nhận & Giải thưởng
            </h2>
            <p className="text-xl text-gray-600">
              Được công nhận bởi các tổ chức uy tín trong và ngoài nước
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              'Chứng nhận JCI về Chất lượng Y tế Quốc tế',
              'Top 10 Bệnh viện tư nhân uy tín tại VN',
              'Giải thưởng Sao Vàng Đất Việt 2025',
              'Chứng chỉ ISO 9001:2015',
              'Bệnh viện An toàn nhất 2024',
              'Giải thưởng Chuyển đổi số Y tế 2025'
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-start gap-4 hover:shadow-lg transition-all"
              >
                <div className="size-12 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="size-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{cert}</h3>
                </div>
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
              Hãy để chúng tôi chăm sóc sức khỏe của bạn
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Đặt lịch khám ngay hôm nay để trải nghiệm dịch vụ y tế chất lượng cao
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/patient/booking"
                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl hover:shadow-2xl transition-all font-semibold text-lg"
              >
                Đặt lịch khám
              </a>
              <a
                href="/doctors"
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-600 transition-all font-semibold text-lg"
              >
                Tìm bác sĩ
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
