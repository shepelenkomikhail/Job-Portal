export default function BenefitsFilter() {
    return (
        <div>
            <p>Benefits</p>
            <label>
                <input type="checkbox" /> Maternity leave
            </label>
            <label>
                <input type="checkbox" /> Medical insurance
            </label>
            <label>
                <input type="checkbox" /> Pension plan
            </label>
            <label>
                <input type="checkbox" checked /> Dental insurance
            </label>
            <label>
                <input type="checkbox" /> Student loan
            </label>
        </div>
    );
}
