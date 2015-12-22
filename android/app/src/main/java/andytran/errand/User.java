package andytran.errand;

/**
 * Created by Andy Tran on 12/8/2015.
 */
public class User {
    private String id;
    private String name;
    private String profilePicUrl;

    public User(String id, String name, String url){
        this.id = id;
        this.name = name;
        this.profilePicUrl = url;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProfilePicUrl() {
        return profilePicUrl;
    }

    public void setProfilePicUrl(String profilePicUrl) {
        this.profilePicUrl = profilePicUrl;
    }
}
