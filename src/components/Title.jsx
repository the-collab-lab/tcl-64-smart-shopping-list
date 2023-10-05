import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

function Title() {
	const styles = classNames(
		// Mobile
		'p-8 text-teal-800 text-5xl text-center tracking-widest	',
		// Tablet
		'p-10 md:text-6xl',
		// Desktop
		'p-12 dark:text-teal-200 lg:text-8xl',
	);
	return (
		<div className={styles}>
			<p>
				LISTIFY <FontAwesomeIcon icon={faLeaf} title="decortive leaf" />
			</p>
		</div>
	);
}

export default Title;
