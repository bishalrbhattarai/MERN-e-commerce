import { Button } from "react-bootstrap"

export const SubmitBtn = ({label = 'Save', icon = 'fa-save', loading = false}) =><Button variant="outline-dark" type="submit" disabled={loading}>
<i className={`fa-solid ${loading ? 'fa-spinner fa-spin': icon }  me-2`} ></i>{label}
</Button>
    
