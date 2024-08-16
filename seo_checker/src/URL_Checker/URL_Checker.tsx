import React, { useState } from 'react';
import styles from './URL_Checker.module.css';

const URL_Checker: React.FC = () => {
    const [url, setUrl] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };

    const handleSubmit = () => {
        // Handle URL checking logic here
        console.log('Checking URL:', url);
    };

    return (
        <div className={styles.container}>
            <input
                type="text"
                value={url}
                onChange={handleChange}
                placeholder="Enter URL"
                className={styles.input}
            />
            <button onClick={handleSubmit} className={styles.button}>
                Go
            </button>
        </div>
    );
};

export default URL_Checker;
