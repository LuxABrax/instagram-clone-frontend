import ContactCard from "./ContactCard";
import ContactsHeader from "./ContactsHeader";

const Contacts = () => {
	return (
		<aside className='messages-contacts'>
			<ContactsHeader />
			<div className='contacts-body'>
				<ContactCard />
				<ContactCard />
				<ContactCard />
				<ContactCard />
				<ContactCard />
				<ContactCard />
				<ContactCard />
				<ContactCard />
				<ContactCard />
				<ContactCard />
				<ContactCard />
				<ContactCard />
				<ContactCard />
			</div>
		</aside>
	);
};

export default Contacts;
