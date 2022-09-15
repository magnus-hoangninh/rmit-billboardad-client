// Function to display the message in alert
export const getResponse = async (res) => {
    let json = await res.json();
    if (res.status >= 400 && res.status <= 500) {
        window.alert(json.errMsg);
    }
    else if (res.status === 202) {
        window.alert(json.acceptMsg);
    }
    else {
        window.alert(json.successMsg);
        window.location.reload();
    }
}

// Function to confirm cancelling the process
export const discardChanges = (type) => {
    if (!window.confirm("Are you sure you want to cancel updating " + type + "?")) {
        return;
    }
    window.location.reload();
}