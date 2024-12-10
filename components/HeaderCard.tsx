const HeaderCard: React.FC = () => {
    return(
        <div className="absolute top-1/2 right-0 m-4 bg-white p-8 rounded-lg shadow-xl z-20 w-80">
        <h3 className="text-2xl font-bold text-center mb-4">Form Donasi</h3>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Nama Lengkap</label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Masukkan Nama"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700">Jumlah Donasi</label>
            <input
              id="amount"
              type="number"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Masukkan Jumlah"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg mt-4"
          >
            Donasi Sekarang
          </button>
        </form>
      </div>
    )
}

export default HeaderCard