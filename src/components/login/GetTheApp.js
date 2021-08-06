import "../../styles/login/getTheApp.scss";

const GetTheApp = () => {
	return (
		<div className='appDownload'>
			<p>Get the Real app.</p>
			<div className='downloads'>
				<a
					target='_blank'
					rel='noreferrer'
					href='https://apps.apple.com/app/instagram/id389801252?vt=lo'
				>
					<img src='/images/downloadApp.png' alt='download from app store' />
				</a>
				<a
					target='_blank'
					rel='noreferrer'
					href='https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb&utm_campaign=loginPage&ig_mid=B5F2BFB5-5A2C-49C6-BF65-4DA9866D6C34&utm_content=lo&utm_medium=badge'
				>
					<img src='/images/downloadPlay.png' alt='download from play store' />
				</a>
			</div>
		</div>
	);
};

export default GetTheApp;
