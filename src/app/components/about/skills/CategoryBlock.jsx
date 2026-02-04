import { motion } from 'framer-motion';
import SkillChip from './SkillChip';
import './CategoryBlock.tailwind.css';

export default function CategoryBlock({ title, items }) {
  return (
    <motion.div
      className="category-block"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }}
    >
      <h4 className="category-title">{title}</h4>
      <div className="category-chips">
        {items.map((item, idx) => (
          <SkillChip key={idx} name={item.name} delay={idx*0.08}/>
        ))}
      </div>
    </motion.div>
  );
}
