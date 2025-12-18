import { Mail, Github, Twitter, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Footer.tailwind.css';

const useSettings = () => {
  const [settings] = useState({ blogName: 'My Refactored Blog', socialLinks: {
    twitter: '#',
    linkedin: '#',
    github: '#',
    email: 'mailto:info@example.com',
  }});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {setLoading(false)}, 100); 
    return () => clearTimeout(timer);
  }, []);
  
  return { settings, loading };
};

export default function Footer() {
  const { settings, loading } = useSettings();

  if (loading) {
    return (
      <footer className="footer-base">
        <div className="footer-loading-placeholder"></div>
      </footer>
    );
  }

  const socialLinks = settings.socialLinks || {};

  const platformMap = [
    { key: 'twitter', Icon: Twitter },
    { key: 'linkedin', Icon: Linkedin },
    { key: 'github', Icon: Github },
    { key: 'email', Icon: Mail },
  ];

  return (
    <footer className="footer-base">
      <div className="footer-content-container">
        <div className="footer-copyright">
          © 2025 {settings.blogName || 'Yasin'} — All Rights Reserved
        </div>

        <div className="footer-links">
          {platformMap
            .filter(platform => socialLinks[platform.key])
            .map(({ key, Icon }) => (
              <a
                key={key}
                href={socialLinks[key]}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <Icon size={20} />
              </a>
            ))}
        </div>
      </div>
    </footer>
  );
}