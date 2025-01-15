import { Camera, Mail, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import DefaultProfilePic from "../ui/DefaultProfilePic";

function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image });
    };
  }

  return (
    <div className="flex-grow">
      <div className="px-4 py-6">
        <div className="p-4 sm:p-6 bg-base-300 space-y-4 rounded-md sm:max-w-2xl mx-auto">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-center sm:text-start">
              My Profile
            </h1>
            <h2 className="opacity-75 text-center sm:text-start text-sm">
              {isUpdatingProfile ? (
                <div className="flex items-center sm:justify-start gap-1 justify-center">
                  Updating{" "}
                  <span className="loading loading-dots loading-sm"></span>
                </div>
              ) : (
                "Update your profile"
              )}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-center sm:justify-start">
              <div className="relative">
                {authUser.profilePic ? (
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={authUser.profilePic} />
                    </div>
                  </div>
                ) : (
                  <DefaultProfilePic
                    fullName={authUser.fullName}
                    type={"profile"}
                  />
                )}
                <label
                  htmlFor="avatar-upload"
                  className={`
                  absolute bottom-0 right-0 
                  bg-primary hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }
                `}
                >
                  <Camera className="w-5 h-5 text-base-200" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
            </div>
            <aside className="space-y-4">
              <div className="flex gap-2 flex-col">
                <span className="flex gap-2 items-center">
                  <User className="size-4" />
                  Name
                </span>
                <p className="bg-base-100 px-3 py-1 rounded-md">
                  {authUser.fullName}
                </p>
              </div>
              <div className="flex gap-2 flex-col">
                <span className="flex gap-2 items-center">
                  <Mail className="size-4" />
                  Email
                </span>
                <p className="bg-base-100 px-3 py-1 rounded-md">
                  {authUser.email}
                </p>
              </div>
            </aside>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="opacity-50 text-sm">
              Hi! I am a certified yapper 😜. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. A aliquam consectetur inventore
              deleniti, praesentium quas quam dolorum temporibus perspiciatis
              dicta minus.
            </p>
          </div>
          <div className="divider h-0"></div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Account Information</h3>
            <div className="space-y-1">
              <div className="flex justify-between">
                <h4 className="opacity-75 text-sm">Yapper Since</h4>{" "}
                <p className="text-sm">14-10-2024</p>
              </div>
              <div className="flex justify-between">
                <h4 className="opacity-7 text-sm">Account Status</h4>{" "}
                <p className="text-success text-sm">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
