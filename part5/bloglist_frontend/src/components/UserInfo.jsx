const UserInfo = ({ user, logout }) => {

  const handleLogout = () => logout()

  return (
    <div>
      <p><i>{user.name} logged in </i></p>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default UserInfo