interface PlantStageProps {
  stage: number;
  plantType: string;
}

// Seed Stage (0-20%)
export const SeedStage = ({ stage }: { stage: number }) => {
  const size = 8 + (stage / 20) * 4;
  
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" style={{ width: `${size}px`, height: `${size}px` }}>
      <ellipse cx="12" cy="14" rx="6" ry="5" fill="#8B4513" opacity="0.9"/>
      <ellipse cx="12" cy="13" rx="5" ry="4" fill="#A0522D"/>
      <path d="M 12 11 Q 13 12 12 13 Q 11 12 12 11" fill="#654321" opacity="0.5"/>
    </svg>
  );
};

// Sprout Stage (20-40%)
export const SproutStage = ({ stage }: { stage: number }) => {
  const height = 20 + ((stage - 20) / 20) * 30;
  const leafSize = Math.min((stage - 20) / 20, 1);
  
  return (
    <svg width="40" height="80" viewBox="0 0 40 80" style={{ height: `${height}px`, width: 'auto' }}>
      {/* Stem */}
      <path 
        d={`M 20 80 Q 20 ${80 - height * 0.7} 20 ${80 - height}`} 
        stroke="#2D5016" 
        strokeWidth="3" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Small leaves */}
      {stage > 25 && (
        <>
          <ellipse 
            cx="15" 
            cy={80 - height * 0.5} 
            rx={5 * leafSize} 
            ry={8 * leafSize} 
            fill="#4CAF50" 
            transform={`rotate(-45 15 ${80 - height * 0.5})`}
          />
          <ellipse 
            cx="25" 
            cy={80 - height * 0.5} 
            rx={5 * leafSize} 
            ry={8 * leafSize} 
            fill="#66BB6A" 
            transform={`rotate(45 25 ${80 - height * 0.5})`}
          />
        </>
      )}
    </svg>
  );
};

// Young Plant Stage (40-65%)
export const YoungPlantStage = ({ stage, plantType }: PlantStageProps) => {
  const height = 50 + ((stage - 40) / 25) * 40;
  const leafGrowth = (stage - 40) / 25;
  
  return (
    <svg width="80" height="120" viewBox="0 0 80 120" style={{ height: `${height}px`, width: 'auto' }}>
      {/* Main stem */}
      <path 
        d={`M 40 120 Q 40 ${120 - height * 0.8} 40 ${120 - height}`}
        stroke="#2D5016" 
        strokeWidth="4" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Lower leaves */}
      <g transform={`translate(40, ${120 - height * 0.3})`}>
        <ellipse 
          cx="-12" cy="0" 
          rx={8 + leafGrowth * 4} 
          ry={12 + leafGrowth * 6} 
          fill="#4CAF50" 
          transform="rotate(-50 -12 0)"
        />
        <path 
          d={`M -12 0 Q -8 -6 -4 -2`} 
          stroke="#388E3C" 
          strokeWidth="1" 
          fill="none"
        />
      </g>
      
      <g transform={`translate(40, ${120 - height * 0.3})`}>
        <ellipse 
          cx="12" cy="0" 
          rx={8 + leafGrowth * 4} 
          ry={12 + leafGrowth * 6} 
          fill="#66BB6A" 
          transform="rotate(50 12 0)"
        />
        <path 
          d={`M 12 0 Q 8 -6 4 -2`} 
          stroke="#388E3C" 
          strokeWidth="1" 
          fill="none"
        />
      </g>
      
      {/* Upper leaves */}
      <g transform={`translate(40, ${120 - height * 0.6})`}>
        <ellipse 
          cx="-10" cy="0" 
          rx={10 + leafGrowth * 5} 
          ry={14 + leafGrowth * 7} 
          fill="#66BB6A" 
          transform="rotate(-40 -10 0)"
        />
        <path 
          d={`M -10 0 Q -6 -8 -2 -3`} 
          stroke="#388E3C" 
          strokeWidth="1" 
          fill="none"
        />
      </g>
      
      <g transform={`translate(40, ${120 - height * 0.6})`}>
        <ellipse 
          cx="10" cy="0" 
          rx={10 + leafGrowth * 5} 
          ry={14 + leafGrowth * 7} 
          fill="#81C784" 
          transform="rotate(40 10 0)"
        />
        <path 
          d={`M 10 0 Q 6 -8 2 -3`} 
          stroke="#388E3C" 
          strokeWidth="1" 
          fill="none"
        />
      </g>
    </svg>
  );
};

// Mature Plant Stage (65-85%)
export const MaturePlantStage = ({ stage, plantType }: PlantStageProps) => {
  const height = 90 + ((stage - 65) / 20) * 40;
  const leafGrowth = (stage - 65) / 20;
  const budSize = Math.max((stage - 75) / 10, 0);
  
  return (
    <svg width="120" height="160" viewBox="0 0 120 160" style={{ height: `${height}px`, width: 'auto' }}>
      {/* Main thick stem */}
      <path 
        d={`M 60 160 Q 60 ${160 - height * 0.85} 60 ${160 - height}`}
        stroke="#2D5016" 
        strokeWidth="6" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Multiple leaf layers */}
      {/* Bottom layer */}
      <g transform={`translate(60, ${160 - height * 0.25})`}>
        {[-20, -10, 10, 20].map((offset, i) => (
          <g key={i} transform={`translate(${offset}, ${Math.abs(offset) * 0.5})`}>
            <ellipse 
              cx={offset < 0 ? -8 : 8} 
              cy="0" 
              rx={12 + leafGrowth * 6} 
              ry={16 + leafGrowth * 8} 
              fill={i % 2 === 0 ? "#4CAF50" : "#66BB6A"} 
              transform={`rotate(${offset < 0 ? -45 : 45} ${offset < 0 ? -8 : 8} 0)`}
            />
            <path 
              d={`M ${offset < 0 ? -8 : 8} 0 Q ${offset < 0 ? -4 : 4} -8 0 -4`} 
              stroke="#388E3C" 
              strokeWidth="1.5" 
              fill="none"
            />
          </g>
        ))}
      </g>
      
      {/* Middle layer */}
      <g transform={`translate(60, ${160 - height * 0.5})`}>
        {[-18, -9, 9, 18].map((offset, i) => (
          <g key={i} transform={`translate(${offset}, ${Math.abs(offset) * 0.3})`}>
            <ellipse 
              cx={offset < 0 ? -10 : 10} 
              cy="0" 
              rx={14 + leafGrowth * 7} 
              ry={18 + leafGrowth * 9} 
              fill={i % 2 === 0 ? "#66BB6A" : "#81C784"} 
              transform={`rotate(${offset < 0 ? -40 : 40} ${offset < 0 ? -10 : 10} 0)`}
            />
            <path 
              d={`M ${offset < 0 ? -10 : 10} 0 Q ${offset < 0 ? -5 : 5} -10 0 -5`} 
              stroke="#388E3C" 
              strokeWidth="1.5" 
              fill="none"
            />
          </g>
        ))}
      </g>
      
      {/* Top layer */}
      <g transform={`translate(60, ${160 - height * 0.75})`}>
        {[-15, -7, 7, 15].map((offset, i) => (
          <g key={i} transform={`translate(${offset}, ${Math.abs(offset) * 0.2})`}>
            <ellipse 
              cx={offset < 0 ? -8 : 8} 
              cy="0" 
              rx={16 + leafGrowth * 8} 
              ry={20 + leafGrowth * 10} 
              fill={i % 2 === 0 ? "#81C784" : "#A5D6A7"} 
              transform={`rotate(${offset < 0 ? -35 : 35} ${offset < 0 ? -8 : 8} 0)`}
            />
            <path 
              d={`M ${offset < 0 ? -8 : 8} 0 Q ${offset < 0 ? -4 : 4} -10 0 -5`} 
              stroke="#388E3C" 
              strokeWidth="1.5" 
              fill="none"
            />
          </g>
        ))}
      </g>
      
      {/* Flower bud forming at top */}
      {stage > 75 && (
        <g transform={`translate(60, ${160 - height})`}>
          <ellipse 
            cx="0" cy="0" 
            rx={6 * budSize} 
            ry={8 * budSize} 
            fill={plantType === 'sunflower' ? "#FFA726" : plantType === 'rose' ? "#EC407A" : "#8B4513"}
            opacity="0.8"
          />
          <ellipse 
            cx="0" cy="0" 
            rx={4 * budSize} 
            ry={6 * budSize} 
            fill={plantType === 'sunflower' ? "#FFB74D" : plantType === 'rose' ? "#F06292" : "#A0522D"}
          />
        </g>
      )}
    </svg>
  );
};

// Blooming Stage (85-100%)
export const BloomingStage = ({ stage, plantType }: PlantStageProps) => {
  const height = 130;
  const bloomSize = (stage - 85) / 15;
  
  const getFlowerColor = () => {
    switch(plantType) {
      case 'sunflower': return { outer: "#FFA726", inner: "#8D6E63", petal: "#FFD54F" };
      case 'rose': return { outer: "#EC407A", inner: "#C2185B", petal: "#F06292" };
      case 'basil': return { outer: "#9575CD", inner: "#7E57C2", petal: "#B39DDB" };
      case 'tomato': return { outer: "#EF5350", inner: "#C62828", petal: "#E57373" };
      default: return { outer: "#FFA726", inner: "#8D6E63", petal: "#FFD54F" };
    }
  };
  
  const colors = getFlowerColor();
  
  return (
    <svg width="140" height="180" viewBox="0 0 140 180" style={{ height: `${height}px`, width: 'auto' }}>
      {/* Thick mature stem */}
      <path 
        d="M 70 180 Q 70 100 70 50"
        stroke="#2D5016" 
        strokeWidth="7" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Full foliage */}
      <g transform="translate(70, 120)">
        {[-25, -15, -5, 5, 15, 25].map((offset, i) => (
          <g key={i} transform={`translate(${offset}, ${Math.abs(offset) * 0.4})`}>
            <ellipse 
              cx={offset < 0 ? -10 : 10} 
              cy="0" 
              rx="16" 
              ry="22" 
              fill={["#4CAF50", "#66BB6A", "#81C784"][i % 3]} 
              transform={`rotate(${offset < 0 ? -45 : 45} ${offset < 0 ? -10 : 10} 0)`}
            />
            <path 
              d={`M ${offset < 0 ? -10 : 10} 0 Q ${offset < 0 ? -5 : 5} -11 0 -6`} 
              stroke="#388E3C" 
              strokeWidth="2" 
              fill="none"
            />
          </g>
        ))}
      </g>
      
      {/* Full bloom flower */}
      <g transform="translate(70, 40)">
        {/* Petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <ellipse 
            key={i}
            cx="0" 
            cy={-15 * bloomSize} 
            rx={12 * bloomSize} 
            ry={20 * bloomSize} 
            fill={colors.petal} 
            transform={`rotate(${angle})`}
            opacity={0.9}
          />
        ))}
        
        {/* Inner petals */}
        {plantType === 'sunflower' && [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
          <ellipse 
            key={i}
            cx="0" 
            cy={-12 * bloomSize} 
            rx={10 * bloomSize} 
            ry={16 * bloomSize} 
            fill={colors.outer} 
            transform={`rotate(${angle})`}
            opacity={0.8}
          />
        ))}
        
        {/* Center */}
        <circle 
          cx="0" 
          cy="0" 
          r={plantType === 'sunflower' ? 12 * bloomSize : 8 * bloomSize} 
          fill={colors.inner}
        />
        
        {/* Center detail */}
        {plantType === 'sunflower' && (
          <>
            {[...Array(20)].map((_, i) => (
              <circle 
                key={i}
                cx={Math.cos(i * 0.3) * (4 + i * 0.3) * bloomSize} 
                cy={Math.sin(i * 0.3) * (4 + i * 0.3) * bloomSize} 
                r={0.8 * bloomSize} 
                fill="#5D4037"
                opacity="0.6"
              />
            ))}
          </>
        )}
        
        {/* Sparkles */}
        {stage > 95 && [0, 60, 120, 180, 240, 300].map((angle, i) => (
          <g key={i} transform={`rotate(${angle})`}>
            <circle 
              cx="0" 
              cy={-35 * bloomSize} 
              r="2" 
              fill="#FFD700"
              opacity="0.8"
            >
              <animate 
                attributeName="opacity" 
                values="0.3;1;0.3" 
                dur="1.5s" 
                begin={`${i * 0.25}s`} 
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </g>
    </svg>
  );
};
