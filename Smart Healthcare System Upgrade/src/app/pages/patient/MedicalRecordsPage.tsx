import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  Activity,
  AlertCircle,
  Calendar,
  Download,
  Eye,
  FileImage,
  FileText,
  Pill,
  Plus,
  Search,
  Upload,
  User,
  X,
} from "lucide-react";

type RecordType = "report" | "prescription" | "image";
type TabKey = "all" | "reports" | "prescriptions" | "images" | "allergies";

type MedicalRecordItem = {
  id: number;
  type: RecordType;
  title: string;
  date: string;
  doctor: string;
  specialty: string;
  status: "active" | "completed";
  summary?: string;
  notes?: string;
  important?: boolean;
  files?: Array<{ name: string; size: string; type: "pdf" | "image" }>;
  medications?: Array<{ name: string; dosage: string; duration: string }>;
};

const initialRecords: MedicalRecordItem[] = [
  {
    id: 1,
    type: "report",
    title: "Kết quả xét nghiệm máu tổng quát",
    date: "2026-05-05",
    doctor: "BS. Nguyễn Văn An",
    specialty: "Tim mạch",
    status: "completed",
    summary:
      "Các chỉ số trong giới hạn bình thường. HbA1c: 5.4%, Cholesterol: 180 mg/dL.",
    files: [{ name: "XN_Mau_050526.pdf", size: "1.2 MB", type: "pdf" }],
  },
  {
    id: 2,
    type: "prescription",
    title: "Đơn thuốc điều trị huyết áp",
    date: "2026-05-03",
    doctor: "BS. Nguyễn Văn An",
    specialty: "Tim mạch",
    status: "active",
    important: true,
    notes: "Uống thuốc đều đặn, theo dõi huyết áp hằng ngày.",
    medications: [
      { name: "Amlodipine 5mg", dosage: "1 viên/ngày", duration: "30 ngày" },
      { name: "Atenolol 50mg", dosage: "1 viên/ngày", duration: "30 ngày" },
    ],
  },
  {
    id: 3,
    type: "image",
    title: "Chụp X-quang phổi",
    date: "2026-04-28",
    doctor: "BS. Lê Văn Bình",
    specialty: "Hô hấp",
    status: "completed",
    summary: "Phổi không có bất thường. Không phát hiện dấu hiệu viêm phổi.",
    files: [{ name: "Xquang_Phoi_280426.jpg", size: "3.5 MB", type: "image" }],
  },
];

const allergies = [
  {
    name: "Penicillin",
    severity: "Cao",
    reaction: "Phát ban, ngứa",
    dateFound: "2020-03-15",
  },
  {
    name: "Aspirin",
    severity: "Trung bình",
    reaction: "Buồn nôn, chóng mặt",
    dateFound: "2018-07-22",
  },
  {
    name: "Hải sản",
    severity: "Cao",
    reaction: "Sưng môi, khó thở",
    dateFound: "2015-05-10",
  },
];

export default function MedicalRecordsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [records, setRecords] = useState(initialRecords);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecordItem | null>(
    null,
  );
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [downloadedFile, setDownloadedFile] = useState("");

  const filteredRecords = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return records.filter((record) => {
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "reports" && record.type === "report") ||
        (activeTab === "prescriptions" && record.type === "prescription") ||
        (activeTab === "images" && record.type === "image");

      const matchesSearch =
        !query ||
        record.title.toLowerCase().includes(query) ||
        record.doctor.toLowerCase().includes(query) ||
        record.specialty.toLowerCase().includes(query);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, records, searchQuery]);

  const addMockRecord = () => {
    setRecords((current) => [
      {
        id: Date.now(),
        type: "report",
        title: "Hồ sơ tự tải lên",
        date: new Date().toISOString().slice(0, 10),
        doctor: "Tự cập nhật",
        specialty: "Tổng quát",
        status: "completed",
        summary: "Tệp đã được thêm vào hồ sơ cá nhân.",
        files: [{ name: "Ho_so_tai_len.pdf", size: "860 KB", type: "pdf" }],
      },
      ...current,
    ]);
    setShowUploadModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              Hồ sơ sức khỏe điện tử
            </h1>
            <p className="text-gray-600">
              Quản lý kết quả xét nghiệm, đơn thuốc, hình ảnh và dị ứng.
            </p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 font-semibold text-white shadow-sm transition-all hover:shadow-lg"
          >
            <Upload className="size-5" />
            Tải lên hồ sơ
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <aside className="space-y-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-xl font-bold text-white">
                  NA
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Nguyễn Văn A</h2>
                  <p className="text-sm text-gray-600">Mã BN: MED2026001</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <InfoRow label="Ngày sinh" value="15/03/1980" />
                <InfoRow label="Giới tính" value="Nam" />
                <InfoRow label="Nhóm máu" value="O+" highlight />
                <InfoRow label="Điện thoại" value="0901234567" />
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 font-bold text-gray-900">
                <Activity className="size-5 text-blue-600" />
                Chỉ số sinh tồn
              </h2>
              <div className="grid gap-3">
                <MetricBox label="Huyết áp" value="120/80 mmHg" />
                <MetricBox label="Nhịp tim" value="72 bpm" />
                <MetricBox label="BMI" value="23.5" />
              </div>
            </section>
          </aside>

          <main className="lg:col-span-3">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Tìm hồ sơ, bác sĩ, chuyên khoa..."
                  className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex overflow-x-auto">
                {[
                  { key: "all", label: "Tất cả", count: records.length },
                  {
                    key: "reports",
                    label: "Kết quả",
                    count: records.filter((item) => item.type === "report").length,
                  },
                  {
                    key: "prescriptions",
                    label: "Đơn thuốc",
                    count: records.filter((item) => item.type === "prescription")
                      .length,
                  },
                  {
                    key: "images",
                    label: "Hình ảnh",
                    count: records.filter((item) => item.type === "image").length,
                  },
                  { key: "allergies", label: "Dị ứng", count: allergies.length },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as TabKey)}
                    className={`min-w-32 flex-1 border-b-2 px-5 py-4 font-semibold transition-all ${
                      activeTab === tab.key
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-transparent text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {tab.label}
                    <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-700">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {activeTab === "allergies" ? (
              <div className="grid gap-4 md:grid-cols-2">
                {allergies.map((allergy) => (
                  <div
                    key={allergy.name}
                    className="rounded-xl border border-red-200 bg-red-50 p-5"
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h3 className="font-bold text-gray-900">{allergy.name}</h3>
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        {allergy.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{allergy.reaction}</p>
                    <p className="mt-2 text-xs text-gray-500">
                      Phát hiện: {new Date(allergy.dateFound).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRecords.map((record, index) => {
                  const TypeIcon = getTypeIcon(record.type);
                  return (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.04 }}
                      className={`rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md ${
                        record.important ? "border-amber-300" : "border-gray-200"
                      }`}
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start">
                        <div className={`flex size-14 shrink-0 items-center justify-center rounded-xl ${getTypeClass(record.type)}`}>
                          <TypeIcon className="size-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                            <div>
                              <h2 className="text-lg font-bold text-gray-900">
                                {record.title}
                              </h2>
                              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Calendar className="size-4" />
                                  {new Date(record.date).toLocaleDateString("vi-VN")}
                                </span>
                                <span className="flex items-center gap-1">
                                  <User className="size-4" />
                                  {record.doctor}
                                </span>
                                <span className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                                  {record.specialty}
                                </span>
                              </div>
                            </div>
                            <span
                              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                                record.status === "active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {record.status === "active"
                                ? "Đang dùng"
                                : "Hoàn thành"}
                            </span>
                          </div>

                          {record.summary && (
                            <p className="mt-4 text-gray-700">{record.summary}</p>
                          )}

                          {record.medications && (
                            <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4">
                              <h3 className="mb-3 font-semibold text-gray-900">
                                Danh sách thuốc
                              </h3>
                              <div className="space-y-2">
                                {record.medications.map((medication) => (
                                  <div key={medication.name} className="flex gap-3">
                                    <Pill className="mt-0.5 size-5 text-green-600" />
                                    <div>
                                      <div className="font-semibold text-gray-900">
                                        {medication.name}
                                      </div>
                                      <div className="text-sm text-gray-600">
                                        {medication.dosage} - {medication.duration}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="mt-5 flex flex-wrap gap-2">
                            <button
                              onClick={() => setSelectedRecord(record)}
                              className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                            >
                              <Eye className="size-4" />
                              Xem chi tiết
                            </button>
                            <button
                              onClick={() =>
                                setDownloadedFile(
                                  record.files?.[0]?.name || `${record.title}.pdf`,
                                )
                              }
                              className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-100"
                            >
                              <Download className="size-4" />
                              Tải xuống
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      <AnimatePresence>
        {selectedRecord && (
          <Modal onClose={() => setSelectedRecord(null)}>
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedRecord.title}
                </h2>
                <p className="text-gray-600">{selectedRecord.doctor}</p>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="space-y-4">
              <Detail label="Ngày" value={new Date(selectedRecord.date).toLocaleDateString("vi-VN")} />
              <Detail label="Chuyên khoa" value={selectedRecord.specialty} />
              <Detail label="Trạng thái" value={selectedRecord.status === "active" ? "Đang dùng" : "Hoàn thành"} />
              {selectedRecord.summary && <Detail label="Tóm tắt" value={selectedRecord.summary} />}
              {selectedRecord.notes && <Detail label="Ghi chú" value={selectedRecord.notes} />}
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showUploadModal && (
          <Modal onClose={() => setShowUploadModal(false)}>
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Tải lên hồ sơ
                </h2>
                <p className="text-gray-600">
                  Frontend demo sẽ thêm một hồ sơ mẫu vào danh sách.
                </p>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50 p-10 text-center">
              <Plus className="mx-auto mb-3 size-10 text-blue-600" />
              <p className="font-semibold text-gray-900">
                Kéo thả tệp hoặc chọn tệp từ máy
              </p>
              <p className="mt-1 text-sm text-gray-600">
                PDF, JPG, PNG tối đa 10MB.
              </p>
            </div>
            <button
              onClick={addMockRecord}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 font-semibold text-white"
            >
              Thêm hồ sơ mẫu
            </button>
          </Modal>
        )}
      </AnimatePresence>

      {downloadedFile && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 shadow-lg">
          <Download className="size-4" />
          Đã chuẩn bị tải: {downloadedFile}
          <button onClick={() => setDownloadedFile("")}>
            <X className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function getTypeIcon(type: RecordType) {
  if (type === "prescription") return Pill;
  if (type === "image") return FileImage;
  return FileText;
}

function getTypeClass(type: RecordType) {
  if (type === "prescription") return "bg-gradient-to-br from-green-500 to-green-600";
  if (type === "image") return "bg-gradient-to-br from-purple-500 to-purple-600";
  return "bg-gradient-to-br from-blue-500 to-blue-600";
}

function InfoRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-gray-600">{label}</span>
      <span className={`font-semibold ${highlight ? "text-red-600" : "text-gray-900"}`}>
        {value}
      </span>
    </div>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-bold text-gray-900">{value}</div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-gray-100 pb-3">
      <div className="text-sm font-semibold text-gray-500">{label}</div>
      <div className="mt-1 text-gray-900">{value}</div>
    </div>
  );
}

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
      >
        {children}
      </motion.div>
      <button className="sr-only" onClick={onClose}>
        Đóng
      </button>
    </div>
  );
}
