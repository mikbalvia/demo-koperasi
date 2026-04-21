import type { ProfilKoperasi, Pengurus, Statistik, Layanan, Berita, DokumenLegalitas, FAQItem } from '$lib/types';

export const profil: ProfilKoperasi = {
	namaResmi: 'Koperasi Kelurahan Merah Putih Awirarangan',
	namasingkat: 'KKMP Awirarangan',
	bentukUsaha: 'Koperasi Konsumen',
	jenisKoperasi: 'Koperasi Serba Usaha (Sembako, AMDK, Jasa Keuangan, dll)',
	nik: '3208130020160',
	alamat:
		'Jl. Jendral Sudirman, RT 006 RW 003, Kel. Awirarangan, Kec. Kuningan, Kab. Kuningan, Jawa Barat, 45511',
	email: 'koprasimerput.awirarangan@gmail.com',
	website: 'https://merahputih.kop.id/',
	visi: 'Menjadi koperasi yang mandiri, modern, dan terpercaya dalam meningkatkan kesejahteraan anggota dan masyarakat Kelurahan Awirarangan.',
	misi: [
		'Menyediakan kebutuhan pokok dan layanan berkualitas dengan harga terjangkau.',
		'Mengembangkan unit usaha yang produktif dan inovatif.',
		'Meningkatkan partisipasi aktif anggota dalam setiap kegiatan koperasi.',
		'Memberikan layanan keuangan yang mudah diakses dan bermanfaat bagi anggota.'
	],
	sejarah:
		'Koperasi Kelurahan Merah Putih Awirarangan didirikan atas inisiatif dan semangat gotong royong warga untuk membangun kekuatan ekonomi bersama. Berawal dari unit usaha kecil yang menyediakan kebutuhan sehari-hari, kini koperasi telah berkembang dengan berbagai layanan untuk memenuhi kebutuhan anggota, mulai dari sembako, air minum dalam kemasan (AMDK), hingga layanan jasa keuangan sederhana. Kami berkomitmen untuk terus tumbuh dan memberikan manfaat sebesar-besarnya bagi seluruh anggota.'
};

export const pengawas: Pengurus[] = [
	{ nama: 'Lurah Awirarangan', jabatan: 'Koordinator Pengawas' },
	{ nama: 'Drs. H. Djodjo Soedirdja, M.Si', jabatan: 'Anggota Pengawas' },
	{ nama: 'Drs. H. Mamat Rohmansyah, M.Si', jabatan: 'Anggota Pengawas' }
];

export const pengurus: Pengurus[] = [
	{ nama: 'H. Abid Zaenal Abidin, SE', jabatan: 'Ketua' },
	{ nama: 'Cicih', jabatan: 'Wakil Ketua Usaha' },
	{ nama: 'Dadi Darmanto', jabatan: 'Wakil Ketua Anggota' },
	{ nama: 'Enda Suhenda Wijaya', jabatan: 'Sekretaris' },
	{ nama: 'Miftah Faridl, S.Sos', jabatan: 'Bendahara' }
];

export const statistik: Statistik[] = [
	{ label: 'Total Anggota', value: 1247, icon: '👥', suffix: '' },
	{ label: 'Unit Usaha Aktif', value: 5, icon: '🏪', suffix: '' },
	{ label: 'Total Simpanan', value: 850, icon: '💰', suffix: ' Juta' },
	{ label: 'SHU Tahun Lalu', value: 120, icon: '📈', suffix: ' Juta' }
];

export const layanan: Layanan[] = [
	{
		judul: 'Kebutuhan Pokok & Sembako',
		deskripsi:
			'Menyediakan sembako dan kebutuhan pokok sehari-hari dengan harga bersahabat untuk menjaga daya beli masyarakat.',
		icon: '🛒'
	},
	{
		judul: 'Air Minum Dalam Kemasan',
		deskripsi:
			'Produksi dan distribusi air minum dalam kemasan (AMDK) berkualitas untuk memenuhi kebutuhan konsumsi harian.',
		icon: '💧'
	},
	{
		judul: 'Jasa Keuangan',
		deskripsi:
			'Layanan simpan pinjam dengan bunga rendah dan proses mudah, membantu anggota mengelola keuangan dengan baik.',
		icon: '🏦'
	}
];

export const berita: Berita[] = [
	{
		id: 'rapat-anggota-2026',
		judul: 'Rapat Anggota Tahunan (RAT) 2026 Sukses Digelar',
		ringkasan:
			'RAT 2026 dihadiri oleh seluruh anggota aktif dan menghasilkan keputusan penting mengenai program kerja tahun depan serta pembagian SHU.',
		tanggal: '2026-03-15',
		kategori: 'Kegiatan'
	},
	{
		id: 'program-sembako-murah',
		judul: 'Program Sembako Murah untuk Warga Kelurahan',
		ringkasan:
			'Koperasi berhasil menjalankan program sembako murah yang berdampak langsung pada 500 keluarga di Kelurahan Awirarangan.',
		tanggal: '2026-02-20',
		kategori: 'Program'
	},
	{
		id: 'pelatihan-digital',
		judul: 'Pelatihan Literasi Digital untuk Pengurus Koperasi',
		ringkasan:
			'Sebanyak 25 pengurus dan anggota mengikuti pelatihan literasi digital guna meningkatkan tata kelola koperasi modern.',
		tanggal: '2026-01-10',
		kategori: 'Pelatihan'
	},
	{
		id: 'kerjasama-pemda',
		judul: 'Penandatanganan MoU dengan Pemda Kabupaten Kuningan',
		ringkasan:
			'KKMP Awirarangan resmi menandatangani nota kesepahaman dengan Pemerintah Kabupaten Kuningan untuk pengembangan ekonomi desa.',
		tanggal: '2025-12-05',
		kategori: 'Kerjasama'
	},
	{
		id: 'launching-amdk',
		judul: 'Peluncuran Produk AMDK "Awirarangan Fresh"',
		ringkasan:
			'Unit usaha AMDK koperasi resmi meluncurkan brand baru "Awirarangan Fresh" dengan kemasan modern dan kualitas terjamin.',
		tanggal: '2025-11-18',
		kategori: 'Usaha'
	},
	{
		id: 'bakti-sosial',
		judul: 'Bakti Sosial Hari Koperasi Nasional',
		ringkasan:
			'Memperingati Hari Koperasi Nasional, KKMP Awirarangan menggelar bakti sosial berupa pembagian 300 paket sembako gratis.',
		tanggal: '2025-07-12',
		kategori: 'Kegiatan'
	}
];

export const dokumenLegalitas: DokumenLegalitas[] = [
	{
		nama: 'Akta Pendirian',
		deskripsi: 'Dokumen dasar pembentukan koperasi yang disahkan oleh notaris.',
		status: 'terdaftar',
		icon: '📜'
	},
	{
		nama: 'SK Kemenkumham',
		deskripsi:
			'Surat Keputusan pengesahan badan hukum dari Kementerian Hukum dan HAM.',
		status: 'terverifikasi',
		icon: '✅'
	},
	{
		nama: 'Nomor Induk Berusaha (NIB)',
		deskripsi: 'Identitas pelaku usaha yang diterbitkan melalui sistem OSS.',
		status: 'aktif',
		icon: '🏛️'
	}
];

export const faqItems: FAQItem[] = [
	{
		pertanyaan: 'Siapa saja yang bisa menjadi anggota koperasi?',
		jawaban:
			'Setiap warga Kelurahan Awirarangan yang berusia minimal 17 tahun atau sudah menikah, memiliki KTP dan berdomisili di wilayah kelurahan dapat mendaftar menjadi anggota koperasi.'
	},
	{
		pertanyaan: 'Berapa biaya pendaftaran menjadi anggota?',
		jawaban:
			'Biaya pendaftaran terdiri dari Simpanan Pokok sebesar Rp 100.000 dan Simpanan Wajib bulanan sebesar Rp 25.000. Simpanan pokok dibayarkan satu kali saat pendaftaran.'
	},
	{
		pertanyaan: 'Apa saja syarat untuk mengajukan pinjaman?',
		jawaban:
			'Syarat pinjaman meliputi: telah menjadi anggota aktif minimal 3 bulan, simpanan wajib lancar, mengisi formulir pengajuan, dan menyertakan jaminan sesuai ketentuan yang berlaku.'
	},
	{
		pertanyaan: 'Bagaimana cara mendapatkan SHU?',
		jawaban:
			'SHU (Sisa Hasil Usaha) dibagikan setiap tahun berdasarkan kontribusi dan partisipasi anggota. Pembagian dilakukan setelah RAT (Rapat Anggota Tahunan) disetujui.'
	},
	{
		pertanyaan: 'Apakah koperasi memiliki toko offline?',
		jawaban:
			'Ya, koperasi memiliki toko yang beralamat di Jl. Jendral Sudirman, Kel. Awirarangan. Toko buka setiap hari Senin–Sabtu pukul 07.00–17.00 WIB.'
	}
];

export const syaratKeanggotaan = [
	'Warga Negara Indonesia yang berdomisili di Kelurahan Awirarangan',
	'Berusia minimal 17 tahun atau sudah menikah',
	'Memiliki Kartu Tanda Penduduk (KTP) yang masih berlaku',
	'Mengisi formulir pendaftaran anggota',
	'Membayar Simpanan Pokok sebesar Rp 100.000',
	'Membayar Simpanan Wajib pertama sebesar Rp 25.000',
	'Menyetujui Anggaran Dasar dan Anggaran Rumah Tangga Koperasi',
	'Menyerahkan fotocopy KTP dan Kartu Keluarga (KK)'
];

export const prosedurPendaftaran = [
	{
		langkah: 1,
		judul: 'Persiapan Dokumen',
		deskripsi: 'Siapkan KTP, KK, dan pas foto 3x4 sebanyak 2 lembar.'
	},
	{
		langkah: 2,
		judul: 'Pengisian Formulir',
		deskripsi: 'Datang ke kantor koperasi dan isi formulir pendaftaran atau unduh dari website.'
	},
	{
		langkah: 3,
		judul: 'Pembayaran Simpanan Awal',
		deskripsi: 'Lakukan pembayaran Simpanan Pokok Rp 100.000 dan Simpanan Wajib Rp 25.000.'
	},
	{
		langkah: 4,
		judul: 'Verifikasi Data',
		deskripsi: 'Tim pengurus akan melakukan verifikasi data dalam waktu 3–5 hari kerja.'
	},
	{
		langkah: 5,
		judul: 'Kartu Anggota',
		deskripsi: 'Setelah disetujui, kartu anggota akan diterbitkan dan dapat diambil di kantor koperasi.'
	}
];

export const navLinks = [
	{ label: 'Profil', href: '/#profil' },
	{ label: 'Layanan', href: '/#layanan' },
	{ label: 'Organisasi', href: '/#organisasi' },
	{ label: 'Berita', href: '/berita' },
	{ label: 'Info Pendaftaran', href: '/info-pendaftaran' },
	{ label: 'Simulasi Cicilan', href: '/simulasi-cicilan' },
	{ label: 'Cek Anggota', href: '/cek-anggota' }
];
