package model;

import java.util.HashMap;

public class DataContainer {
	HashMap<String, UserModel> Users;
	
	public DataContainer() {
		Users = new HashMap<String, UserModel>();
		UserModel tp = new UserModel("Travaux","Pratiques","tp","tp","ADMIN");
		UserModel tpwatcher = new UserModel("TravauxW","PratiquesW","tpwatcher","tpwatcher","WATCHER");

		Users.put(tp.getLogin(), tp);
		Users.put(tpwatcher.getLogin(), tpwatcher);
	}

	
	public String checkUser(UserModel user) {
		String role;

		if (Users.containsKey(user.getLogin())) {
			UserModel containerUser = Users.get(user.getLogin());
			if ((containerUser.getPwd()).equals(user.getPwd())) {
				role = containerUser.getRole();
			}
			else {
				role = "NONE";
				System.out.println("Wrong pwd");
			}
		}
		else {
			role = "NONE";
			System.out.println("Wrong login");
		}
		return role;
	}

}
