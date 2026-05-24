export function DiagramIllustration() {
  return (
    <div className="mt-8 mb-4 rounded-lg border bg-accent p-6">
      <svg
        viewBox="0 0 580 280"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full"
        aria-label="Simplified energy system topology diagram"
      >
        {/* Grid node */}
        <rect
          x="16"
          y="90"
          width="88"
          height="100"
          rx="3"
          fill="#ECEAE5"
          stroke="rgba(26,24,20,0.18)"
          strokeWidth="1"
        />
        <text
          x="60"
          y="132"
          textAnchor="middle"
          fontFamily="DM Mono,monospace"
          fontSize="9"
          fill="#9E9C97"
          letterSpacing="0.08em"
        >
          GRID
        </text>
        <rect
          x="30"
          y="142"
          width="60"
          height="28"
          rx="2"
          fill="#F5F2EE"
          stroke="rgba(26,24,20,0.14)"
          strokeWidth="1"
        />
        <text
          x="60"
          y="161"
          textAnchor="middle"
          fontFamily="DM Mono,monospace"
          fontSize="8"
          fill="#6B6860"
        >
          Meter
        </text>

        {/* Solar node */}
        <rect
          x="150"
          y="50"
          width="100"
          height="70"
          rx="3"
          fill="#E6F1FB"
          stroke="#85B7EB"
          strokeWidth="1"
        />
        <text
          x="200"
          y="78"
          textAnchor="middle"
          fontFamily="DM Mono,monospace"
          fontSize="9"
          fill="#185FA5"
          letterSpacing="0.06em"
        >
          SOLAR
        </text>
        <text
          x="200"
          y="94"
          textAnchor="middle"
          fontFamily="DM Mono,monospace"
          fontSize="8"
          fill="#378ADD"
        >
          Inverter
        </text>
        <text
          x="200"
          y="108"
          textAnchor="middle"
          fontFamily="DM Mono,monospace"
          fontSize="8"
          fill="#378ADD"
        >
          3.8 kW ↓
        </text>

        {/* Battery node */}
        <rect
          x="150"
          y="160"
          width="100"
          height="70"
          rx="3"
          fill="#ECEAE5"
          stroke="rgba(26,24,20,0.18)"
          strokeWidth="1"
        />
        <text
          x="200"
          y="188"
          textAnchor="middle"
          fontFamily="DM Mono,monospace"
          fontSize="9"
          fill="#6B6860"
          letterSpacing="0.06em"
        >
          BATTERY
        </text>
        <text
          x="200"
          y="204"
          textAnchor="middle"
          fontFamily="DM Mono,monospace"
          fontSize="8"
          fill="#9E9C97"
        >
          Charging
        </text>
        <rect
          x="166"
          y="211"
          width="70"
          height="6"
          rx="1"
          fill="rgba(26,24,20,0.08)"
        />
        <rect x="166" y="211" width="46" height="6" rx="1" fill="#4A7FA5" />

        {/* Main panel */}
        <rect
          x="306"
          y="90"
          width="108"
          height="100"
          rx="3"
          fill="#ECEAE5"
          stroke="rgba(26,24,20,0.18)"
          strokeWidth="1"
        />
        <text
          x="360"
          y="130"
          textAnchor="middle"
          fontFamily="DM Mono,monospace"
          fontSize="9"
          fill="#6B6860"
          letterSpacing="0.06em"
        >
          MAIN
        </text>
        <text
          x="360"
          y="144"
          textAnchor="middle"
          fontFamily="DM Mono,monospace"
          fontSize="9"
          fill="#6B6860"
          letterSpacing="0.06em"
        >
          PANEL
        </text>
        <text
          x="360"
          y="162"
          textAnchor="middle"
          fontFamily="DM Mono,monospace"
          fontSize="8"
          fill="#9E9C97"
        >
          1.2 kW load
        </text>

        {/* Home loads */}
        <rect
          x="462"
          y="60"
          width="100"
          height="64"
          rx="3"
          fill="#ECEAE5"
          stroke="rgba(26,24,20,0.18)"
          strokeWidth="1"
        />
        <text
          x="512"
          y="89"
          textAnchor="middle"
          fontFamily="DM Mono,monospace"
          fontSize="9"
          fill="#6B6860"
          letterSpacing="0.06em"
        >
          HOME
        </text>
        <text
          x="512"
          y="105"
          textAnchor="middle"
          fontFamily="DM Mono,monospace"
          fontSize="8"
          fill="#9E9C97"
        >
          Loads
        </text>

        {/* EV Charger */}
        <rect
          x="462"
          y="156"
          width="100"
          height="64"
          rx="3"
          fill="#ECEAE5"
          stroke="rgba(26,24,20,0.18)"
          strokeWidth="1"
        />
        <text
          x="512"
          y="183"
          textAnchor="middle"
          fontFamily="DM Mono,monospace"
          fontSize="9"
          fill="#6B6860"
          letterSpacing="0.06em"
        >
          WALL
        </text>
        <text
          x="512"
          y="199"
          textAnchor="middle"
          fontFamily="DM Mono,monospace"
          fontSize="9"
          fill="#6B6860"
          letterSpacing="0.06em"
        >
          CONNECTOR
        </text>

        {/* Edges */}
        <defs>
          <marker
            id="arr"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="#9E9C97" />
          </marker>
          <marker
            id="arr-active"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="#4A7FA5" />
          </marker>
        </defs>
        <line
          x1="104"
          y1="140"
          x2="148"
          y2="140"
          stroke="#9E9C97"
          strokeWidth="1"
          strokeDasharray="4,3"
          markerEnd="url(#arr)"
        />
        <line
          x1="200"
          y1="120"
          x2="200"
          y2="158"
          stroke="#4A7FA5"
          strokeWidth="1.5"
          markerEnd="url(#arr-active)"
        />
        <line
          x1="250"
          y1="85"
          x2="306"
          y2="120"
          stroke="#4A7FA5"
          strokeWidth="1.5"
          markerEnd="url(#arr-active)"
        />
        <line
          x1="250"
          y1="195"
          x2="306"
          y2="165"
          stroke="#9E9C97"
          strokeWidth="1"
          markerEnd="url(#arr)"
        />
        <line
          x1="414"
          y1="120"
          x2="462"
          y2="92"
          stroke="#9E9C97"
          strokeWidth="1"
          markerEnd="url(#arr)"
        />
        <line
          x1="414"
          y1="160"
          x2="462"
          y2="178"
          stroke="#9E9C97"
          strokeWidth="1"
          markerEnd="url(#arr)"
        />

        <text
          x="290"
          y="276"
          textAnchor="middle"
          fontFamily="DM Mono,monospace"
          fontSize="8"
          fill="#9E9C97"
          letterSpacing="0.06em"
        >
          Blue lines = active power flow · Dashed = standby
        </text>
      </svg>
      <p className="mt-3.5 text-xs italic">
        Simplified topology — real diagrams reflect each home's specific
        hardware configuration.
      </p>
    </div>
  )
}
