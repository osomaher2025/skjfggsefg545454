
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { 
  AlertTriangle, 
  Shield, 
  Smartphone, 
  Lock, 
  Mail, 
  ChevronRight 
} from 'lucide-react';

const SecurityPage: React.FC = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirm password must match.",
        variant: "destructive",
      });
      return;
    }
    
    // Password change logic would go here
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    
    // Reset form
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };
  
  const handleTwoFactorToggle = (checked: boolean) => {
    setTwoFactorEnabled(checked);
    toast({
      title: checked ? "Two-factor authentication enabled" : "Two-factor authentication disabled",
      description: checked 
        ? "Your account is now more secure with 2FA." 
        : "Two-factor authentication has been turned off.",
    });
  };
  
  const securityLogs = [
    { event: "Password changed", date: "May 10, 2025", ip: "192.168.1.1", location: "New York, USA" },
    { event: "Login successful", date: "May 8, 2025", ip: "192.168.1.1", location: "New York, USA" },
    { event: "Login attempt failed", date: "May 6, 2025", ip: "103.42.91.5", location: "Unknown" },
    { event: "Two-factor settings changed", date: "April 22, 2025", ip: "192.168.1.1", location: "New York, USA" },
    { event: "Login successful", date: "April 15, 2025", ip: "192.168.1.1", location: "New York, USA" },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Security</h1>
        <p className="text-muted-foreground">
          Manage your account security settings and preferences.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Password Change Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="mr-2 h-5 w-5" />
              Change Password
            </CardTitle>
            <CardDescription>Update your password regularly to keep your account secure.</CardDescription>
          </CardHeader>
          <form onSubmit={handlePasswordSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input 
                  id="currentPassword" 
                  name="currentPassword" 
                  type="password" 
                  value={passwordData.currentPassword} 
                  onChange={handlePasswordChange} 
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input 
                  id="newPassword" 
                  name="newPassword" 
                  type="password" 
                  value={passwordData.newPassword} 
                  onChange={handlePasswordChange} 
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  type="password" 
                  value={passwordData.confirmPassword} 
                  onChange={handlePasswordChange} 
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Update Password</Button>
            </CardFooter>
          </form>
        </Card>
        
        {/* Two-Factor Authentication Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Smartphone className="mr-2 h-5 w-5" />
              Two-Factor Authentication
            </CardTitle>
            <CardDescription>Add an extra layer of security to your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Require a verification code when logging in.
                </p>
              </div>
              <Switch 
                checked={twoFactorEnabled} 
                onCheckedChange={handleTwoFactorToggle} 
              />
            </div>
            
            {twoFactorEnabled && (
              <div className="border rounded-md p-4 bg-muted/30">
                <h4 className="font-medium mb-2">Two-factor authentication is enabled</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Your account is now protected with an additional layer of security.
                </p>
                <Button variant="outline" size="sm">
                  Configure settings
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Security Alerts Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Security Alerts
            </CardTitle>
            <CardDescription>Configure how you receive security alerts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive alerts for suspicious activity via email.
                </p>
              </div>
              <Switch 
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Login Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Receive notifications for logins from new devices.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Unusual Activity</p>
                <p className="text-sm text-muted-foreground">
                  Alerts for potentially unauthorized actions.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
        
        {/* Activity Log Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Security Activity Log
            </CardTitle>
            <CardDescription>Recent security events for your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityLogs.map((log, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between py-2"
                >
                  <div>
                    <p className="font-medium">{log.event}</p>
                    <div className="flex text-sm text-muted-foreground gap-2">
                      <span>{log.date}</span>
                      <span>•</span>
                      <span>{log.ip}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Full Activity Log</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SecurityPage;
