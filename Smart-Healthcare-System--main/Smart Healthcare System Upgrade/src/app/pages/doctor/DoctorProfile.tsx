import { motion } from 'motion/react';
import React, { useState } from 'react';
import {
  Save, Award, Briefcase, GraduationCap, Phone, Mail,
  MapPin, Calendar, Clock, Edit2, Check, X, Upload, Star, ShieldCheck,
  Plus, Trash2
} from 'lucide-react';
import DoctorHeader from '../../components/doctor/DoctorHeader';

export default function DoctorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'experience' | 'certifications'>('info');
  const [saving, setSaving] = useState(false);
  const [showAddExp, setShowAddExp] = useState(false);
  const [showAddCert, setShowAddCert] = useState(false);
  const [editingExpId, setEditingExpId] = useState<number | null>(null);
  const [editingCertId, setEditingCertId] = useState<number | null>(null);
  const [expForm, setExpForm] = useState({ position: '', organization: '', period: '', current: false });
  const [certForm, setCertForm] = useState({ name: '', issuer: '', year: '', status: 'active' });
  const [editingScheduleId, setEditingScheduleId] = useState<string | null>(null);
  const [scheduleForm, setScheduleForm] = useState({ day: '', time: '', room: '' });

  const [profile, setProfile] = useState({
    name: 'Nguyễn Văn An',
    title: 'Bác sĩ Chuyên khoa II',
    specialty: 'Tim mạch',
    department: 'Khoa Tim mạch - Lão học',
    experience: 15,
    degree: 'Bác sĩ Chuyên khoa II - Đại học Y Hà Nội',
    phone: '0901 234 567',
    email: 'bs.nguyenvanan@medicare.vn',
    address: '123 Nguyễn Trãi, Quận 1, TP.HCM',
    bio: 'Bác sĩ chuyên khoa II với hơn 15 năm kinh nghiệm trong lĩnh vực tim mạch. Chuyên môn về chẩn đoán và điều trị các bệnh lý tim mạch, đặc biệt là các bệnh lý về nhịp tim và suy tim.',
    languages: 'Tiếng Việt, Tiếng Anh',
    rating: 4.9,
    totalReviews: 324,
    avatar: '',
  });

  const [experiences, setExperiences] = useState([
    { id: 1, position: 'Trưởng khoa Tim mạch', organization: 'Bệnh viện MediCare', period: '2020 - Hiện tại', current: true },
    { id: 2, position: 'Bác sĩ chính', organization: 'Bệnh viện Chợ Rẫy', period: '2015 - 2020', current: false },
    { id: 3, position: 'Bác sĩ nội trú', organization: 'BV Tim TWH', period: '2010 - 2015', current: false },
  ]);

  const [certifications, setCertifications] = useState([
    { id: 1, name: 'Bằng Bác sĩ Chuyên khoa II - Tim mạch', issuer: 'Đại học Y Hà Nội', year: '2015', status: 'active' },
    { id: 2, name: 'Chứng chỉ hành nghề khám chữa bệnh', issuer: 'Bộ Y tế', year: '2016', status: 'active' },
    { id: 3, name: 'Đào tạo Can thiệp Tim mạch', issuer: 'Singapore NHCS', year: '2018', status: 'active' },
    { id: 4, name: 'Siêu âm tim qua thực quản', issuer: 'BV Tim TWH', year: '2019', status: 'active' },
  ]);

  const [schedule, setSchedule] = useState([
    { id: '1', day: 'Thứ 2', time: '08:00 - 12:00', room: 'P101', status: 'available' },
    { id: '2', day: 'Thứ 3', time: '08:00 - 12:00', room: 'P101', status: 'available' },
    { id: '3', day: 'Thứ 4', time: '13:00 - 17:00', room: 'P101', status: 'busy' },
    { id: '4', day: 'Thứ 5', time: '08:00 - 12:00', room: 'P101', status: 'available' },
    { id: '5', day: 'Thứ 6', time: '08:00 - 12:00', room: 'P101', status: 'available' },
    { id: '6', day: 'Thứ 7', time: '08:00 - 11:00', room: 'P102', status: 'off' },
  ]);

  const getSlotStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return { label: 'Sẵn sàng', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' };
      case 'busy': return { label: 'Bận', color: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500' };
      case 'off': return { label: 'Nghỉ', color: 'bg-gray-100 text-gray-500', dot: 'bg-gray-400' };
      default: return { label: 'Sẵn sàng', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' };
    }
  };

  const cycleSlotStatus = (slotId: string) => {
    setSchedule(prev => prev.map(s => {
      if (s.id !== slotId) return s;
      const next = s.status === 'available' ? 'busy' : s.status === 'busy' ? 'off' : 'available';
      return { ...s, status: next };
    }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); setIsEditing(false); }, 1500);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddExp = () => {
    if (!expForm.position || !expForm.organization || !expForm.period) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    const newId = Math.max(...experiences.map(e => e.id)) + 1;
    setExperiences([...experiences, { id: newId, ...expForm }]);
    setExpForm({ position: '', organization: '', period: '', current: false });
    setShowAddExp(false);
  };

  const handleDeleteExp = (id: number) => {
    if (confirm('Xóa kinh nghiệm này?')) {
      setExperiences(experiences.filter(e => e.id !== id));
    }
  };

  const handleAddCert = () => {
    if (!certForm.name || !certForm.issuer || !certForm.year) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    const newId = Math.max(...certifications.map(c => c.id)) + 1;
    setCertifications([...certifications, { id: newId, ...certForm }]);
    setCertForm({ name: '', issuer: '', year: '', status: 'active' });
    setShowAddCert(false);
  };

  const handleDeleteCert = (id: number) => {
    if (confirm('Xóa chứng chỉ này?')) {
      setCertifications(certifications.filter(c => c.id !== id));
    }
  };

  const handleEditSchedule = (slot: any) => {
    setEditingScheduleId(slot.id);
    setScheduleForm({ day: slot.day, time: slot.time, room: slot.room });
  };

  const handleSaveSchedule = () => {
    if (!scheduleForm.day || !scheduleForm.time || !scheduleForm.room) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    setSchedule(schedule.map(s => s.id === editingScheduleId ? { ...s, ...scheduleForm } : s));
    setEditingScheduleId(null);
    setScheduleForm({ day: '', time: '', room: '' });
  };

  return (
    <div>
      <DoctorHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hồ sơ bác sĩ</h1>
            <p className="text-gray-600">Quản lý thông tin cá nhân và chuyên môn</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center gap-2"
            >
              <Edit2 className="size-4" />
              Chỉnh sửa
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium flex items-center gap-2"
              >
                <X className="size-4" />
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin size-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Check className="size-4" />
                    Lưu thay đổi
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="h-28 bg-gradient-to-r from-green-600 to-emerald-500"></div>
              <div className="px-6 pb-6">
                <div className="-mt-12 mb-4 flex justify-between items-end">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="Avatar" className="size-24 rounded-2xl object-cover shadow-xl border-4 border-white" />
                  ) : (
                    <div className="size-24 bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl border-4 border-white">
                      {profile.name.split(' ').map(n => n[0]).slice(-2).join('')}
                    </div>
                  )}
                  <div className="flex items-center gap-1 bg-white rounded-lg px-2 py-1 shadow-sm">
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-gray-900">{profile.rating}</span>
                    <span className="text-xs text-gray-500">({profile.totalReviews})</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="size-5 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">Đã xác minh</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-gray-600 font-medium mb-1">{profile.title}</p>
                <p className="text-green-600 text-sm font-medium mb-4">{profile.specialty} · {profile.department}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="size-4 text-gray-400" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="size-4 text-gray-400" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="size-4 text-gray-400" />
                    <span>{profile.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase className="size-4 text-gray-400" />
                    <span>{profile.experience} năm kinh nghiệm</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <GraduationCap className="size-4 text-gray-400" />
                    <span className="truncate">{profile.degree}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-3">Giới thiệu</h3>
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none resize-none text-sm"
                />
              ) : (
                <p className="text-sm text-gray-600 leading-relaxed">{profile.bio}</p>
              )}
            </motion.div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="flex border-b border-gray-200">
                {[
                  { key: 'info', label: 'Thông tin', icon: Award },
                  { key: 'experience', label: 'Kinh nghiệm', icon: Briefcase },
                  { key: 'certifications', label: 'Chứng chỉ', icon: GraduationCap },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex-1 px-4 py-3.5 font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                      activeTab === tab.key
                        ? 'border-b-2 border-green-600 text-green-600 bg-green-50'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="size-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="p-6">
                {activeTab === 'info' && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { label: 'Họ và tên', key: 'name', type: 'text' },
                        { label: 'Chức danh', key: 'title', type: 'text' },
                        { label: 'Chuyên khoa', key: 'specialty', type: 'text' },
                        { label: 'Khoa/Phòng', key: 'department', type: 'text' },
                        { label: 'Số điện thoại', key: 'phone', type: 'tel' },
                        { label: 'Email', key: 'email', type: 'email' },
                        { label: 'Địa chỉ', key: 'address', type: 'text' },
                        { label: 'Ngôn ngữ', key: 'languages', type: 'text' },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">{field.label}</label>
                          {isEditing ? (
                            <input
                              type={field.type}
                              value={(profile as any)[field.key]}
                              onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm"
                            />
                          ) : (
                            <div className="px-3 py-2 bg-gray-50 rounded-xl text-sm text-gray-900">{String((profile as any)[field.key])}</div>
                          )}
                        </div>
                      ))}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Số năm kinh nghiệm</label>
                        {isEditing ? (
                          <input
                            type="number"
                            value={profile.experience}
                            onChange={(e) => setProfile({ ...profile, experience: parseInt(e.target.value) })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm"
                          />
                        ) : (
                          <div className="px-3 py-2 bg-gray-50 rounded-xl text-sm text-gray-900">{profile.experience} năm</div>
                        )}
                      </div>
                    </div>
                    {isEditing && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ảnh đại diện</label>
                        <div className="flex items-center gap-3">
                          {profile.avatar ? (
                            <img src={profile.avatar} alt="Avatar" className="size-16 rounded-xl object-cover border-2 border-green-200" />
                          ) : (
                            <div className="size-16 bg-gradient-to-br from-green-600 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-lg border-2 border-green-200">
                              {profile.name.split(' ').map(n => n[0]).slice(-2).join('')}
                            </div>
                          )}
                          <label className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-all cursor-pointer flex items-center gap-2">
                            <Upload className="size-4" />
                            Tải ảnh lên
                            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'experience' && (
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <button
                        onClick={() => setShowAddExp(true)}
                        className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all text-sm font-medium flex items-center gap-2"
                      >
                        <Plus className="size-4" /> Thêm kinh nghiệm
                      </button>
                    </div>
                    {showAddExp && (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
                        <h4 className="font-semibold text-gray-900">Thêm kinh nghiệm mới</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          <input type="text" placeholder="Chức vụ" value={expForm.position} onChange={e => setExpForm({ ...expForm, position: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                          <input type="text" placeholder="Tổ chức" value={expForm.organization} onChange={e => setExpForm({ ...expForm, organization: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                          <input type="text" placeholder="Thời gian (VD: 2020 - 2025)" value={expForm.period} onChange={e => setExpForm({ ...expForm, period: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                          <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="checkbox" checked={expForm.current} onChange={e => setExpForm({ ...expForm, current: e.target.checked })} className="size-4 rounded" />
                            Công việc hiện tại
                          </label>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={handleAddExp} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">Lưu</button>
                          <button onClick={() => { setShowAddExp(false); setExpForm({ position: '', organization: '', period: '', current: false }); }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300">Hủy</button>
                        </div>
                      </div>
                    )}
                    {experiences.map((exp) => (
                      <div key={exp.id} className="relative pl-6 pb-4 border-l-2 border-green-200 last:border-0 last:pb-0">
                        <div className="absolute -left-1.5 top-1 size-3 bg-gradient-to-br from-green-600 to-emerald-500 rounded-full"></div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                            <p className="text-sm text-green-600 font-medium">{exp.organization}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                              <Calendar className="size-3" />
                              <span>{exp.period}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {exp.current && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">Hiện tại</span>
                            )}
                            <button onClick={() => handleDeleteExp(exp.id)} className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'certifications' && (
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <button
                        onClick={() => setShowAddCert(true)}
                        className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all text-sm font-medium flex items-center gap-2"
                      >
                        <Plus className="size-4" /> Thêm chứng chỉ
                      </button>
                    </div>
                    {showAddCert && (
                      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 space-y-3">
                        <h4 className="font-semibold text-gray-900">Thêm chứng chỉ mới</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          <input type="text" placeholder="Tên chứng chỉ" value={certForm.name} onChange={e => setCertForm({ ...certForm, name: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                          <input type="text" placeholder="Tổ chức cấp" value={certForm.issuer} onChange={e => setCertForm({ ...certForm, issuer: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                          <input type="text" placeholder="Năm cấp (VD: 2024)" value={certForm.year} onChange={e => setCertForm({ ...certForm, year: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                          <select value={certForm.status} onChange={e => setCertForm({ ...certForm, status: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white">
                            <option value="active">Còn hiệu lực</option>
                            <option value="expired">Hết hạn</option>
                          </select>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={handleAddCert} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">Lưu</button>
                          <button onClick={() => { setShowAddCert(false); setCertForm({ name: '', issuer: '', year: '', status: 'active' }); }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300">Hủy</button>
                        </div>
                      </div>
                    )}
                    {certifications.map((cert) => (
                      <div key={cert.id} className="p-4 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl border border-gray-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Award className="size-5 text-green-600" />
                            <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              cert.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                            }`}>
                              {cert.status === 'active' ? 'Còn hiệu lực' : 'Hết hạn'}
                            </span>
                            <button onClick={() => handleDeleteCert(cert.id)} className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 ml-7">{cert.issuer} · {cert.year}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Clock className="size-5 text-green-600" />
                  Lịch làm việc
                </h3>
                <button
                  onClick={() => {
                    const nextId = String(parseInt(schedule[schedule.length - 1].id) + 1);
                    setEditingScheduleId(nextId);
                    setScheduleForm({ day: 'Thứ 2', time: '08:00 - 12:00', room: 'P101' });
                  }}
                  className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-all flex items-center gap-1"
                >
                  <Plus className="size-3" /> Thêm
                </button>
              </div>
              <div className="space-y-2">
                {schedule.map((slot) => (
                  <div key={slot.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors">
                    {editingScheduleId === slot.id ? (
                      <div className="flex items-center gap-2 w-full">
                        <select value={scheduleForm.day} onChange={e => setScheduleForm({ ...scheduleForm, day: e.target.value })} className="px-2 py-1.5 border border-gray-300 rounded-lg text-sm bg-white">
                          {['Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7','Chủ nhật'].map(d => <option key={d}>{d}</option>)}
                        </select>
                        <select value={scheduleForm.time} onChange={e => setScheduleForm({ ...scheduleForm, time: e.target.value })} className="px-2 py-1.5 border border-gray-300 rounded-lg text-sm bg-white">
                          {['08:00 - 12:00','13:00 - 17:00','08:00 - 17:00'].map(t => <option key={t}>{t}</option>)}
                        </select>
                        <select value={scheduleForm.room} onChange={e => setScheduleForm({ ...scheduleForm, room: e.target.value })} className="px-2 py-1.5 border border-gray-300 rounded-lg text-sm bg-white">
                          {['P101','P102','P103','P104'].map(r => <option key={r}>{r}</option>)}
                        </select>
                        <button onClick={handleSaveSchedule} className="px-2 py-1.5 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700">Lưu</button>
                        <button onClick={() => setEditingScheduleId(null)} className="px-2 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-xs hover:bg-gray-300">Hủy</button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <span className="w-20 text-sm font-semibold text-gray-900">{slot.day}</span>
                          <span className="text-sm text-gray-600">{slot.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">{slot.room}</span>
                          <button
                            onClick={() => cycleSlotStatus(slot.id)}
                            className={`px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1 transition-all hover:opacity-80 ${getSlotStatusLabel(slot.status).color}`}
                          >
                            <span className={`size-1.5 rounded-full ${getSlotStatusLabel(slot.status).dot}`}></span>
                            {getSlotStatusLabel(slot.status).label}
                          </button>
                          <button onClick={() => handleEditSchedule(slot)} className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                            <Edit2 className="size-3.5" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
