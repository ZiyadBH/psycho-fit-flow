import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  Edit3,
  X,
  Dumbbell,
  Brain,
  Heart,
  RefreshCw,
  Trash2,
  Download,
  Bell,
  Shield,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "+1 555-0123",
    location: "New York, USA",
    age: 28,
    gender: "Male",
    weight: 75,
    height: 178,
    fitnessLevel: "Beginner",
    mainGoal: "Improve general fitness",
    preferredTime: "Morning",
    sessionDuration: "30-45 minutes",
  });

  const [editForm, setEditForm] = useState({ ...profile });

  const bmi = (editForm.weight / ((editForm.height / 100) ** 2)).toFixed(1);

  const handleSave = () => {
    setProfile({ ...editForm });
    setEditing(false);
    toast({ title: "Profile Updated", description: "Your profile has been saved successfully." });
  };

  const handleCancel = () => {
    setEditForm({ ...profile });
    setEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground mt-1">Manage your personal information</p>
          </div>
          {!editing ? (
            <Button onClick={() => setEditing(true)} variant="hero">
              <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleCancel} variant="outline"><X className="w-4 h-4 mr-2" /> Cancel</Button>
              <Button onClick={handleSave} variant="hero"><Save className="w-4 h-4 mr-2" /> Save</Button>
            </div>
          )}
        </motion.div>

        {/* Avatar & Basic Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
              {profile.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
              <p className="text-muted-foreground">{profile.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Full Name" icon={<User className="w-4 h-4" />} editing={editing}
              value={editForm.name} onChange={v => setEditForm({ ...editForm, name: v })} />
            <Field label="Email" icon={<Mail className="w-4 h-4" />} editing={editing}
              value={editForm.email} onChange={v => setEditForm({ ...editForm, email: v })} type="email" />
            <Field label="Phone" icon={<Phone className="w-4 h-4" />} editing={editing}
              value={editForm.phone} onChange={v => setEditForm({ ...editForm, phone: v })} />
            <Field label="Location" icon={<MapPin className="w-4 h-4" />} editing={editing}
              value={editForm.location} onChange={v => setEditForm({ ...editForm, location: v })} />
          </div>
        </motion.div>

        {/* Physical Data */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-secondary" /> Physical Data
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <NumField label="Age" editing={editing} value={editForm.age}
              onChange={v => setEditForm({ ...editForm, age: Number(v) })} />
            <div>
              <Label className="text-sm text-muted-foreground">Gender</Label>
              {editing ? (
                <select className="w-full mt-1 h-10 rounded-md border border-input bg-background px-3 text-sm"
                  value={editForm.gender} onChange={e => setEditForm({ ...editForm, gender: e.target.value })}>
                  <option>Male</option><option>Female</option>
                </select>
              ) : (
                <p className="text-foreground font-medium mt-1">{editForm.gender}</p>
              )}
            </div>
            <NumField label="Weight (kg)" editing={editing} value={editForm.weight}
              onChange={v => setEditForm({ ...editForm, weight: Number(v) })} />
            <NumField label="Height (cm)" editing={editing} value={editForm.height}
              onChange={v => setEditForm({ ...editForm, height: Number(v) })} />
          </div>
          <div className="mt-4 p-3 bg-primary/10 rounded-xl">
            <span className="text-sm text-muted-foreground">BMI: </span>
            <span className="font-bold text-primary">{bmi}</span>
          </div>
        </motion.div>

        {/* Psychological-Fitness Data */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" /> Assessment Data
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Fitness Level" icon={<Heart className="w-4 h-4" />} editing={editing}
              value={editForm.fitnessLevel} onChange={v => setEditForm({ ...editForm, fitnessLevel: v })} />
            <Field label="Main Goal" icon={<Brain className="w-4 h-4" />} editing={editing}
              value={editForm.mainGoal} onChange={v => setEditForm({ ...editForm, mainGoal: v })} />
            <Field label="Preferred Time" icon={<Dumbbell className="w-4 h-4" />} editing={editing}
              value={editForm.preferredTime} onChange={v => setEditForm({ ...editForm, preferredTime: v })} />
            <Field label="Session Duration" icon={<Dumbbell className="w-4 h-4" />} editing={editing}
              value={editForm.sessionDuration} onChange={v => setEditForm({ ...editForm, sessionDuration: v })} />
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent" /> Settings & Actions
          </h3>
          <div className="space-y-3">
            <SettingButton icon={<RefreshCw className="w-4 h-4" />} label="Retake Assessment" description="Redo your psychological-physical assessment" />
            <SettingButton icon={<Download className="w-4 h-4" />} label="Export My Data" description="Download all your data as JSON" />
            <SettingButton icon={<Bell className="w-4 h-4" />} label="Notification Settings" description="Manage push and email notifications" />
            <SettingButton icon={<Trash2 className="w-4 h-4" />} label="Delete My Account" description="Permanently delete your account and data" danger />
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

const Field = ({ label, icon, editing, value, onChange, type = "text" }: {
  label: string; icon: React.ReactNode; editing: boolean; value: string; onChange: (v: string) => void; type?: string;
}) => (
  <div>
    <Label className="text-sm text-muted-foreground flex items-center gap-1">{icon} {label}</Label>
    {editing ? (
      <Input type={type} value={value} onChange={e => onChange(e.target.value)} className="mt-1" />
    ) : (
      <p className="text-foreground font-medium mt-1">{value}</p>
    )}
  </div>
);

const NumField = ({ label, editing, value, onChange }: {
  label: string; editing: boolean; value: number; onChange: (v: string) => void;
}) => (
  <div>
    <Label className="text-sm text-muted-foreground">{label}</Label>
    {editing ? (
      <Input type="number" value={value} onChange={e => onChange(e.target.value)} className="mt-1" />
    ) : (
      <p className="text-foreground font-medium mt-1">{value}</p>
    )}
  </div>
);

const SettingButton = ({ icon, label, description, danger }: {
  icon: React.ReactNode; label: string; description: string; danger?: boolean;
}) => (
  <button className={`w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors text-left ${danger ? "hover:border-red-300" : ""}`}>
    <div className={`${danger ? "text-red-500" : "text-muted-foreground"}`}>{icon}</div>
    <div>
      <p className={`font-medium ${danger ? "text-red-500" : "text-foreground"}`}>{label}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </button>
);

export default Profile;
