export default function UserName({ user }) {
  const name = `${user.lastName}, ${user.firstName}`;
  let title = name;
  let userInfo = [user.organization, user.email]
    .filter((info) => info)
    .join(", ");
  if (userInfo) title += `: ${userInfo}`;
  return <abbr title={title}>{name}</abbr>;
}
