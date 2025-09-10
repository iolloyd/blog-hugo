# Font Optimization Note

The Inter variable font (`inter-var.woff2`) is currently 344KB, which is larger than ideal for mobile performance.

## Optimization Options:

1. **Use a subset font** - Only include characters you need:
   ```bash
   # Install fonttools
   pip install fonttools brotli
   
   # Create subset with only Latin characters
   pyftsubset InterVariable.woff2 \
     --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD" \
     --output-file="inter-var-subset.woff2" \
     --flavor=woff2
   ```

2. **Use individual weight files** instead of variable font for critical weights only

3. **Consider using system fonts only** - The implementation already supports this via the typography toggle

## Current Implementation:
- Font loading is progressive and non-blocking
- System fonts are used as fallback
- Users can opt for system fonts via the accessibility toggle
- Slow connections automatically skip custom fonts

The current setup will work well despite the file size because:
- Font loading doesn't block rendering (font-display: swap)
- It's loaded asynchronously after critical content
- System fonts display immediately while Inter loads