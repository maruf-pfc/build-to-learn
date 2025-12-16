'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/lib/api';
import { toast } from "sonner";
import { User, Briefcase, GraduationCap, Code, Shield, Trash2, Camera, Upload, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
    const { user, checkAuth } = useAuthStore();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('personal');
    
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        headline: '',
        bio: '',
        socialLinks: { website: '', linkedin: '', github: '', twitter: '' },
        skills: [],
        experience: [],
        education: [],
        cv: ''
    });

    const [skillInput, setSkillInput] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            await checkAuth(); 
            const res = await api.get('/auth/me'); 
            const d = res.data;
            
            setFormData({
                name: d.name || '',
                headline: d.headline || '',
                bio: d.bio || '',
                socialLinks: d.socialLinks || { website: '', linkedin: '', github: '', twitter: '' },
                skills: d.skills || [],
                experience: d.experience || [],
                education: d.education || [],
                cv: d.cv || ''
            });

        } catch (err) {
            toast.error('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSocialChange = (e) => {
        setFormData({ 
            ...formData, 
            socialLinks: { ...formData.socialLinks, [e.target.name]: e.target.value } 
        });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.put('/users/profile', formData);
            toast.success('Profile updated!');
            await checkAuth(); // Refresh global store
        } catch (err) {
            toast.error('Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    // Skills
    const addSkill = (e) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            e.preventDefault();
            if (!formData.skills.includes(skillInput.trim())) {
                setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
            }
            setSkillInput('');
        }
    };
    const removeSkill = (skill) => {
        setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
    };

    // Experience
    const addExperience = () => {
        const newExp = { company: '', role: '', startDate: '', endDate: '', description: '', current: false };
        setFormData({ ...formData, experience: [...formData.experience, newExp] });
    };
    
    const updateExperience = (index, field, value) => {
        const newExp = [...formData.experience];
        newExp[index][field] = value;
        setFormData({ ...formData, experience: newExp });
    };
    
    const removeExperience = (index) => {
        setFormData({ ...formData, experience: formData.experience.filter((_, i) => i !== index) });
    };
    
    // Education
     const addEducation = () => {
        const newEdu = { school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '' };
        setFormData({ ...formData, education: [...formData.education, newEdu] });
    };
    
    const updateEducation = (index, field, value) => {
        const newEdu = [...formData.education];
        newEdu[index][field] = value;
        setFormData({ ...formData, education: newEdu });
    };
    
    const removeEducation = (index) => {
        setFormData({ ...formData, education: formData.education.filter((_, i) => i !== index) });
    };


    // Assets
    const handleFileUpload = async (e, type) => { // type: 'avatar' or 'cv'
        const file = e.target.files[0];
        if (!file) return;
        
        const fd = new FormData();
        fd.append('image', file); 

        try {
            const toastId = toast.loading('Uploading...');
            const res = await api.post('/upload', fd, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            const url = res.data.secure_url || res.data.url;
            
            if (type === 'avatar') {
                await api.put('/users/profile', { avatar: url });
                await checkAuth();
                toast.success('Avatar updated', { id: toastId });
            } else {
                setFormData({ ...formData, cv: url });
                toast.success('CV uploaded (Click Save to persist)', { id: toastId });
            }
        } catch (err) {
            toast.error('Upload failed');
        }
    };
    
    const handleDeleteAccount = async () => {
        if (!confirm('Are you ABSOLUTELY SURE? This action cannot be undone.')) return;
        try {
            await api.delete('/users/profile');
            toast.success('Account deleted');
            window.location.href = '/login';
        } catch(err) {
            toast.error('Failed to delete account');
        }
    };


    if (loading) return <div className="p-10 text-center text-muted-foreground">Loading Profile...</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Header */}
            <Card>
                <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative group">
                        <Avatar className="w-32 h-32 border-4 border-background shadow-lg">
                            <AvatarImage src={user?.avatar} />
                            <AvatarFallback><User className="w-full h-full p-6 text-muted-foreground" /></AvatarFallback>
                        </Avatar>
                         <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition rounded-full cursor-pointer text-white">
                            <Camera size={24} />
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'avatar')} />
                        </label>
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-3xl font-bold text-foreground">{formData.name}</h1>
                        <p className="text-muted-foreground font-medium text-lg mb-2">{formData.headline || 'No headline set'}</p>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {formData.skills.slice(0, 5).map(skill => (
                                <Badge key={skill} variant="secondary">{skill}</Badge>
                            ))}
                        </div>
                    </div>
                    <div>
                         <Button onClick={handleSave} disabled={saving} size="lg">
                            {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="md:col-span-1 space-y-2">
                    {[
                        { id: 'personal', icon: User, label: 'Personal Info' },
                        { id: 'experience', icon: Briefcase, label: 'Experience' },
                        { id: 'education', icon: GraduationCap, label: 'Education' },
                        { id: 'skills', icon: Code, label: 'Skills & CV' },
                        { id: 'security', icon: Shield, label: 'Danger Zone', className: 'text-destructive hover:bg-destructive/10 hover:text-destructive' }
                    ].map(tab => (
                        <Button
                            key={tab.id}
                            variant={activeTab === tab.id ? 'secondary' : 'ghost'}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn("w-full justify-start", tab.className)}
                        >
                            <tab.icon size={18} className="mr-2" />
                            {tab.label}
                        </Button>
                    ))}
                </div>

                {/* Main Content */}
                <div className="md:col-span-3">
                    <Card className="min-h-[500px]">
                        <CardContent className="p-8">
                        
                        {/* PERSONAL */}
                        {activeTab === 'personal' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold mb-6 text-foreground">Personal Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-2 space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <Label htmlFor="headline">Headline</Label>
                                        <Input id="headline" name="headline" value={formData.headline} onChange={handleChange} placeholder="e.g. Senior Full Stack Developer" />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={4} className="resize-y" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="website">Website</Label>
                                        <Input id="website" name="website" value={formData.socialLinks.website} onChange={handleSocialChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="linkedin">LinkedIn</Label>
                                        <Input id="linkedin" name="linkedin" value={formData.socialLinks.linkedin} onChange={handleSocialChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="github">GitHub</Label>
                                        <Input id="github" name="github" value={formData.socialLinks.github} onChange={handleSocialChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="twitter">Twitter</Label>
                                        <Input id="twitter" name="twitter" value={formData.socialLinks.twitter} onChange={handleSocialChange} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* EXPERIENCE */}
                        {activeTab === 'experience' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-foreground">Work Experience</h2>
                                    <Button onClick={addExperience} variant="ghost" className="text-primary hover:text-primary"><Plus size={18} className="mr-2"/> Add Position</Button>
                                </div>
                                <div className="space-y-8">
                                    {formData.experience.map((exp, i) => (
                                        <div key={i} className="p-6 bg-muted/30 rounded-xl relative group border border-border">
                                            <Button variant="ghost" size="icon" onClick={() => removeExperience(i)} className="absolute top-4 right-4 text-muted-foreground hover:text-destructive"><X size={20}/></Button>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="col-span-2">
                                                    <Input placeholder="Company Name" className="bg-transparent border-0 border-b border-input rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 font-bold text-lg" value={exp.company} onChange={e => updateExperience(i, 'company', e.target.value)} />
                                                </div>
                                                <div>
                                                    <Input placeholder="Role / Title" className="bg-transparent border-0 border-b border-input rounded-none focus-visible:ring-0 focus-visible:border-primary px-0" value={exp.role} onChange={e => updateExperience(i, 'role', e.target.value)} />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <input type="checkbox" checked={exp.current} onChange={e => updateExperience(i, 'current', e.target.checked)} id={`curr-${i}`} className="form-checkbox rounded text-primary" />
                                                    <Label htmlFor={`curr-${i}`} className="cursor-pointer">Current Role</Label>
                                                </div>
                                                <div className="col-span-2">
                                                    <Textarea placeholder="Description" rows={2} className="bg-background text-sm" value={exp.description} onChange={e => updateExperience(i, 'description', e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {formData.experience.length === 0 && <p className="text-center text-muted-foreground py-8">No experience added yet.</p>}
                                </div>
                            </div>
                        )}

                        {/* EDUCATION */}
                         {activeTab === 'education' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-foreground">Education</h2>
                                    <Button onClick={addEducation} variant="ghost" className="text-primary hover:text-primary"><Plus size={18} className="mr-2"/> Add School</Button>
                                </div>
                                <div className="space-y-8">
                                    {formData.education.map((edu, i) => (
                                        <div key={i} className="p-6 bg-muted/30 rounded-xl relative group border border-border">
                                            <Button variant="ghost" size="icon" onClick={() => removeEducation(i)} className="absolute top-4 right-4 text-muted-foreground hover:text-destructive"><X size={20}/></Button>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="col-span-2">
                                                    <Input placeholder="School / University" className="bg-transparent border-0 border-b border-input rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 font-bold text-lg" value={edu.school} onChange={e => updateEducation(i, 'school', e.target.value)} />
                                                </div>
                                                <div>
                                                    <Input placeholder="Degree" className="bg-transparent border-0 border-b border-input rounded-none focus-visible:ring-0 focus-visible:border-primary px-0" value={edu.degree} onChange={e => updateEducation(i, 'degree', e.target.value)} />
                                                </div>
                                                <div>
                                                    <Input placeholder="Field of Study" className="bg-transparent border-0 border-b border-input rounded-none focus-visible:ring-0 focus-visible:border-primary px-0" value={edu.fieldOfStudy} onChange={e => updateEducation(i, 'fieldOfStudy', e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                     {formData.education.length === 0 && <p className="text-center text-muted-foreground py-8">No education added yet.</p>}

                                </div>
                            </div>
                        )}

                        {/* SKILLS & CV */}
                        {activeTab === 'skills' && (
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-2xl font-bold mb-6 text-foreground">Skills</h2>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {formData.skills.map(skill => (
                                            <Badge key={skill} variant="secondary" className="flex items-center gap-1 pl-3 pr-2 py-1">
                                                {skill}
                                                <button onClick={() => removeSkill(skill)} className="hover:text-destructive ml-1"><X size={14}/></button>
                                            </Badge>
                                        ))}
                                    </div>
                                    <Input 
                                        placeholder="Type skill and press Enter..." 
                                        value={skillInput}
                                        onChange={e => setSkillInput(e.target.value)}
                                        onKeyDown={addSkill}
                                    />
                                </div>
                                
                                <Separator />

                                <div>
                                    <h2 className="text-2xl font-bold mb-6 text-foreground">Resume / CV</h2>
                                    <div className="border-2 border-dashed border-input rounded-xl p-8 text-center hover:bg-muted/50 transition cursor-pointer relative">
                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'cv')} />
                                        <Upload className="mx-auto text-muted-foreground mb-4" size={48} />
                                        {formData.cv ? (
                                            <div>
                                                <p className="text-green-600 dark:text-green-400 font-bold mb-2">CV Uploaded Successfully</p>
                                                <a href={formData.cv} target="_blank" className="text-primary underline text-sm z-10 relative" onClick={e => e.stopPropagation()}>View Current CV</a>
                                                <p className="text-xs text-muted-foreground mt-2">Click to replace</p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="font-bold text-foreground">Drop your resume here or click to upload</p>
                                                <p className="text-sm text-muted-foreground">PDF, DOCX supported</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* DANGER ZONE */}
                        {activeTab === 'security' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold mb-6 text-destructive flex items-center gap-2"><Shield size={24}/> Danger Zone</h2>
                                <p className="text-muted-foreground">Once you delete your account, there is no going back. Please be certain.</p>
                                
                                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-bold text-destructive">Delete Account</h3>
                                        <p className="text-destructive/80 text-sm">Permanently remove your account and all data</p>
                                    </div>
                                    <Button onClick={handleDeleteAccount} variant="destructive">Delete Account</Button>
                                </div>
                            </div>
                        )}

                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
