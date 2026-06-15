import { Package, ShoppingCart, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ activeTab, onTabChange,onLogout }) {
    const navigate = useNavigate();
  const navItems = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'users', label: 'Users', icon: Users },
  ]
  const handleLogout = async(e)=>{
      e.preventDefault();
      const success = await onLogout();
      if(success){
        navigate("/");
      }
  }

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="text-sm text-slate-400 mt-1">Ecommerce Dashboard</p>
      </div>

      <nav className="flex-1 p-6 space-y-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* <div className="p-6 border-t border-slate-700">
        <p className="text-xs text-slate-500">© 2024 Ecommerce Admin</p>
      </div> */}
      <div className='h-20 flex justify-center items-center -ml-10'>
        <button 
        onClick={handleLogout}
        className='bg-red-600 border rounded-3xl w-20 h-10'>Logout</button>
      </div>
    </div>
  )
}
