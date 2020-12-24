import React from 'react';
import '../../App.css';

export default function SignUp() {
    return (
        <>
            <div className="form-xl">
                <h2>SignUp</h2>
                <form>
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" placeholder="Email@peacodove.cd" className="input" />
                    </div>
                </form>
            </div>
        </>
    );
}