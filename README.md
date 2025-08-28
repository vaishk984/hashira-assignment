# Kumari Vaishnavi - 22BCE11581 - Hashira Assignment
1. Decoding Points

Each point is stored in JSON where the key is the x-coordinate and the value is encoded in a specific base.

The decodePoint function converts these values into normal (x,y) coordinates.

2. Lagrange Interpolation at x=0

The lagrangeAtZero function applies the Lagrange interpolation formula directly at 𝑥=0

This gives the constant term of the polynomial, which is the hidden secret C.

3. Recovering the Secret

The recoverSecret function:

Reads n (number of points) and k (minimum required points).

Decodes all points from the JSON.

Selects the first k points (sufficient to define the polynomial).

Calls lagrangeAtZero to calculate C.

4. Running the Script

The program reads the input JSON file path from the command line.

### Test the sample test cases using the command: node recover_secret.js test_input2.json

It parses the file, runs the recovery process, and prints:
### Test the sample test cases using the command: node recover_secret.js test_input.json
