import AdminNav from "@/features/AdminNav/ui/AdminNav"
import style from "./layout.module.css"

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className={`${style.posRelative} container`}>
        <AdminNav />
      </div>

      {children}
    </section>
  )
}
