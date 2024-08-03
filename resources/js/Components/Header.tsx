
const Header = () => {
  return (
    <header className="px-5 py-3 border shadow">
    <div className="flex justify-end">
      <img 
        src="https://placehold.co/400" 
        alt="profile picture"
        className="size-6 rounded-full mx-2" 
      />
      <button
        className="text-sm"
      >
        John Doe
      </button>
    </div>
  </header>
  )
}

export default Header
