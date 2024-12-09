import loginRepository from "../core/domain/repository/LoginRepository/loginRepository";

class Utility {
  constructor() {}

  async checkLoginUtility() {
    const res = await loginRepository.checkLogin();
    if (res == null) {
      window.location.href = "/";
    }
  }


   formatDate(dateString: string): string {
    const date = new Date(dateString);
  
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    const day = date.getUTCDate();
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();
  
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  
    // Return formatted string
    return `${day}, ${month} ${year}, ${hours}:${minutes}:${seconds}`;
  }
  
}

export default new Utility();
