export interface Pengurus {
	nama: string;
	jabatan: string;
	foto?: string;
}

export interface Statistik {
	label: string;
	value: number;
	suffix?: string;
	icon: string;
}

export interface Layanan {
	judul: string;
	deskripsi: string;
	icon: string;
}

export interface Berita {
	id: string;
	judul: string;
	ringkasan: string;
	tanggal: string;
	kategori: string;
	thumbnail?: string;
	konten?: string;
}

export interface DokumenLegalitas {
	nama: string;
	deskripsi: string;
	status: 'aktif' | 'terverifikasi' | 'terdaftar';
	icon: string;
}

export interface FAQItem {
	pertanyaan: string;
	jawaban: string;
}

export interface ProfilKoperasi {
	namaResmi: string;
	namasingkat: string;
	bentukUsaha: string;
	jenisKoperasi: string;
	nik: string;
	alamat: string;
	email: string;
	website: string;
	visi: string;
	misi: string[];
	sejarah: string;
}
